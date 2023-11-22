import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAsset, IAssetFullInfo } from "App/Interfaces/Asset";
import {
  IAssetInventory,
  IAssetInventoryDate,
  IAssetInventorySchema,
} from "App/Interfaces/AssetInventory";
import { IAssetInventoryRepository } from "App/Repositories/AssetInventoryRepository";
import { IAssetRepository } from "App/Repositories/AssetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import { deleteRepetitions } from "App/Utils/helpers";
import { DateTime } from "luxon";
import { IAssetService } from "../AssetService/AssetService";
import { assetXLSXFilePath, assetXLSXRows, assetXLSXcolumnNames } from "./XLSX";

export interface IAssetInventoryService {
  createAssetInventory(
    payload: IAssetInventorySchema
  ): Promise<ApiResponse<IAssetInventory[]>>;
  generateAssetInventoryXLSX(
    assetIds: Array<number>
  ): Promise<ApiResponse<string>>;
  getAssetInventoryDates(): Promise<ApiResponse<IAssetInventoryDate[]>>;
}

export default class AssetInventoryService implements IAssetInventoryService {
  constructor(
    private assetInventoryRepository: IAssetInventoryRepository,
    private assetRepository: IAssetRepository,
    private assetService: IAssetService
  ) {}
  // CREATE ASSET INVENTORY
  public async createAssetInventory(payload: IAssetInventorySchema) {
    const assetsDataCleaned = deleteRepetitions(payload.assetIds);
    const assetsDataSorted = assetsDataCleaned.map((assetId) => ({
      assetId,
      hour: DateTime.now().hour.toString(),
      userCreated: Env.get("CURRENT_USER_DOCUMENT"),
    }));
    const assetInventoryCreated =
      await this.assetInventoryRepository.createAssetInventory(
        assetsDataSorted
      );
    return new ApiResponse(assetInventoryCreated, EResponseCodes.OK);
  }
  // GENERATE ASSET INVENTORY XLSX
  public async generateAssetInventoryXLSX(assetIds: Array<number>) {
    let assetJoinPromises: Promise<IAsset>[] = [];
    const assetIdsCleared = deleteRepetitions(assetIds);
    const assetsFound = await this.assetRepository.getManyAssets(
      assetIdsCleared
    );
    for (let asset of assetsFound) {
      const assetJoinedPromise = this.assetService.getJoinedAssetInfo(asset);
      assetJoinPromises.push(assetJoinedPromise);
    }
    const assetsJoined = (await Promise.all(
      assetJoinPromises
    )) as IAssetFullInfo[];
    await generateXLSX({
      columns: assetXLSXcolumnNames,
      data: assetXLSXRows(assetsJoined),
      filePath: assetXLSXFilePath,
      worksheetName: "Control inventario activos tecnológicos",
    });
    return new ApiResponse(assetXLSXFilePath, EResponseCodes.OK);
  }
  // GET ASSET INVENTORY DATES
  public async getAssetInventoryDates() {
    const assetsInventoryDatesFound =
      await this.assetInventoryRepository.getAssetInventoryDates();
    return new ApiResponse(assetsInventoryDatesFound, EResponseCodes.OK);
  }
}
