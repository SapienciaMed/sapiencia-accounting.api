import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetHistory } from "App/Interfaces/AssetHistory";
import AssetHistoryRepository from "App/Repositories/AssetHistoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IAssetHistoryService {
  getAssetHistoryById(id: number): Promise<ApiResponse<IAssetHistory[]>>;
}

export default class AssetHistoryService implements IAssetHistoryService {
  constructor(private assetHistoryRepository: AssetHistoryRepository) {}
  // GET ASSET HISTORY BY ID
  public async getAssetHistoryById(assetId: number) {
    const assetHistoryFound =
      await this.assetHistoryRepository.getAssetHistoryById(assetId);
    return new ApiResponse(assetHistoryFound, EResponseCodes.OK);
  }
}
