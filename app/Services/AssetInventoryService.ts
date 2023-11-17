import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAssetInventory,
  IAssetInventorySchema,
} from "App/Interfaces/AssetInventory";
import AssetInventoryRepository from "App/Repositories/AssetInventoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { deleteRepetitions } from "App/Utils/helpers";
import { DateTime } from "luxon";

export interface IAssetInventoryService {
  createAssetInventory(
    payload: IAssetInventorySchema
  ): Promise<ApiResponse<IAssetInventory[]>>;
}

export default class AssetInventoryService implements IAssetInventoryService {
  constructor(private assetInventoryRepository: AssetInventoryRepository) {}
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
}
