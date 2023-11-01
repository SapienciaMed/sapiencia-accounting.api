import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAsset, IAssetSchema } from "App/Interfaces/Asset";
import AssetRepository from "App/Repositories/AssetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IAssetService {
  createAsset(payload: IAssetSchema): Promise<ApiResponse<IAsset>>;
}

export default class AssetService implements IAssetService {
  constructor(private assetRepository: AssetRepository) {}
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    const newAsset = await this.assetRepository.createAsset(payload);
    return new ApiResponse(newAsset, EResponseCodes.OK);
  }
}
