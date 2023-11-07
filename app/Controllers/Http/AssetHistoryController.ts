import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetHistoryProvider from "@ioc:core.AssetHistoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class AssetHistoryController {
  // GET ASSET HISTORY BY ID
  public async getAssetHistoryById(ctx: HttpContextContract) {
    const { response, request, logger } = ctx;
    try {
      const { assetId } = request.params();
      const assetHistoryFound = await AssetHistoryProvider.getAssetHistoryById(
        assetId
      );
      return response.ok(assetHistoryFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
