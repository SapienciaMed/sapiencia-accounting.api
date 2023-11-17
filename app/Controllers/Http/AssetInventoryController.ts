import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetInventoryProvider from "@ioc:core.AssetInventoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetInventorySchema } from "App/Interfaces/AssetInventory";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createAssetInventorySchema } from "App/Validators/AssetInventory/create";

export default class AssetInventoryController {
  // CREATE ASSET INVENTORY
  public async createAssetInventory(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAssetInventorySchema;
    try {
      payload = await request.validate({ schema: createAssetInventorySchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAssetInventory =
        await AssetInventoryProvider.createAssetInventory(payload);
      return response.created(newAssetInventory);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
