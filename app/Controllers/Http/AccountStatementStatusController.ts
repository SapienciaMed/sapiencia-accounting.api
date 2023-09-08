import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementStatusProvider from "@ioc:core.AccountStatementStatusProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class AccountStatementStatusController {
  // GET ALL ACCOUNT STATEMENT STATUS
  public async getAllAccountStatementStatus(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const accountStatementStatuses =
        await AccountStatementStatusProvider.getAllAccountStatementStatus();
      return response.ok(accountStatementStatuses);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
