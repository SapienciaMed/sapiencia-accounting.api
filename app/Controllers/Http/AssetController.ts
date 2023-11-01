import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetProvider from "@ioc:core.AssetProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetSchema, IAssetsFilters } from "App/Interfaces/Asset";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { assetsPaginatedSchema } from "App/Validators/Asset/assetsPaginatedSchema";
import { createAssetSchema } from "App/Validators/Asset/createAssetSchema";

export default class AssetController {
  // CREATE ASSET
  public async createAsset(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAssetSchema;
    try {
      payload = await request.validate({ schema: createAssetSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAsset = await AssetProvider.createAsset(payload);
      return response.created(newAsset);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL ASSETS PAGINATED
  public async getAllAssetsPaginated(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAssetsFilters;
    try {
      filters = await request.validate({ schema: assetsPaginatedSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const assetsFound = await AssetProvider.getAllAssetsPaginated(filters);
      return response.created(assetsFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ASSET XLSX
  public async generateAssetXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAssetsFilters;
    try {
      filters = await request.validate({ schema: assetsPaginatedSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await AssetProvider.generateAssetXLSX(filters);
      response.header(
        "Content-Disposition",
        `attachment; filename=activos_tecnológicos.xlsx`
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
