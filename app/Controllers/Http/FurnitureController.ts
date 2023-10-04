import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureProvider from "@ioc:core.FurnitureProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ContractController {
  // GET IDENTIFICATION USERS SELECT INFO
  public async getIdentificationUsersSelectInfo(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const idsFound =
        await FurnitureProvider.getIdentificationUsersSelectInfo();
      return response.ok(idsFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET WORKERS FULL NAME SELECT INFO
  public async getWorkersFullNameSelectInfo(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const fullNamesFound =
        await FurnitureProvider.getWorkersFullNameSelectInfo();
      return response.ok(fullNamesFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
