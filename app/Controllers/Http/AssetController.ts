import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetProvider from "@ioc:core.AssetProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAssetSchema,
  IAssetsFilters,
  IUpdateAssetSchema,
} from "App/Interfaces/Asset";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { assetsPaginatedSchema } from "App/Validators/Asset/assetsPaginatedSchema";
import { createAssetSchema } from "App/Validators/Asset/createAssetSchema";
import { updateAssetSchema } from "App/Validators/Asset/updateAssetSchema";

export default class AssetController {
  // GET WORKERS INFO SELECT
  public async getWorkersInfoSelect(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const workersInfoSelect = await AssetProvider.getWorkersInfoSelect();
      return response.ok(workersInfoSelect);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse([], EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
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
      return response.ok(assetsFound);
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
  // GET ASSET BY ID
  public async getAssetById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const assetFound = await AssetProvider.getAssetById(id);
      return response.ok(assetFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE ASSET BY ID
  public async updateAssetById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IUpdateAssetSchema;
    try {
      payload = await request.validate({ schema: updateAssetSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const updatedAsset = await AssetProvider.updateAssetById(id, payload);
      return response.ok(updatedAsset);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
