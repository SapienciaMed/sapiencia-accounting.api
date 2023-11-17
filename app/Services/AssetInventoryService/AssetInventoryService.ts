import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAsset, IAssetFullInfo } from "App/Interfaces/Asset";
import {
  IAssetInventory,
  IAssetInventorySchema,
} from "App/Interfaces/AssetInventory";
import AssetInventoryRepository from "App/Repositories/AssetInventoryRepository";
import AssetRepository from "App/Repositories/AssetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import { deleteRepetitions } from "App/Utils/helpers";
import { DateTime } from "luxon";
import AssetService from "../AssetService/AssetService";
import { assetXLSXFilePath, assetXLSXRows, assetXLSXcolumnNames } from "./XLSX";

export interface IAssetInventoryService {
  createAssetInventory(
    payload: IAssetInventorySchema
  ): Promise<ApiResponse<IAssetInventory[]>>;
  generateAssetInventoryXLSX(
    payload: IAssetInventorySchema
  ): Promise<ApiResponse<string>>;
}

export default class AssetInventoryService implements IAssetInventoryService {
  constructor(
    private assetInventoryRepository: AssetInventoryRepository,
    private assetRepository: AssetRepository,
    private assetService: AssetService
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
  public async generateAssetInventoryXLSX(payload: IAssetInventorySchema) {
    let assetJoinPromises: Promise<IAsset>[] = [];
    const assetIdsCleared = deleteRepetitions(payload.assetIds);
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
      worksheetName: "Control inventario",
    });
    return new ApiResponse(assetXLSXFilePath, EResponseCodes.OK);
  }
}
