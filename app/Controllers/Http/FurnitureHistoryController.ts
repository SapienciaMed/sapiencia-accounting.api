import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureHistoryProvider from "@ioc:core.FurnitureHistoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class FurnitureHistoryController {
  // GET FURNITURE HISTORY BY ID
  public async getFurnitureHistoryById(ctx: HttpContextContract) {
    const { response, request, logger } = ctx;
    try {
      const { furnitureId } = request.params();
      const furnitureHistoryFound =
        await FurnitureHistoryProvider.getFurnitureHistoryById(furnitureId);
      return response.ok(furnitureHistoryFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
