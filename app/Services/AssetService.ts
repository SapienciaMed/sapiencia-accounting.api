import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAsset, IAssetSchema, IAssetsFilters } from "App/Interfaces/Asset";
import AssetRepository from "App/Repositories/AssetRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IAssetService {
  createAsset(payload: IAssetSchema): Promise<ApiResponse<IAsset>>;
  getAllAssetsPaginated(
    filters: IAssetsFilters
  ): Promise<ApiResponse<IPagingData<IAsset>>>;
}

export default class AssetService implements IAssetService {
  constructor(private assetRepository: AssetRepository) {}
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    const newAsset = await this.assetRepository.createAsset(payload);
    return new ApiResponse(newAsset, EResponseCodes.OK);
  }
  // GET ALL ASSETS PAGINATED
  public async getAllAssetsPaginated(filters: IAssetsFilters) {
    const assetsFound = await this.assetRepository.getAllAssetsPaginated(
      filters
    );
    return new ApiResponse(assetsFound, EResponseCodes.OK);
  }
}
