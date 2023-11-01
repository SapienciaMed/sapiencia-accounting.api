import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetProvider from "@ioc:core.AssetProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetSchema } from "App/Interfaces/Asset";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
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
      const newBusiness = await AssetProvider.createAsset(payload);
      return response.created(newBusiness);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
