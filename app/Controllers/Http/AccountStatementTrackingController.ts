import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementTrackingProvider from "@ioc:core.AccountStatementTrackingProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatementTrackingPayload } from "App/Interfaces/AccountStatementTracking";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementTrackingSchema } from "App/Validators/AccountStatementTrackingSchema";

export default class AccountStatementTrackingController {
  // UPDATE OR CREATE ACCOUNT STATEMENT TRACKING
  public async updateOrCreateAccountStatementTracking(
    ctx: HttpContextContract
  ) {
    const { request, response, logger } = ctx;
    let payload: IAccountStatementTrackingPayload;
    try {
      payload = await request.validate({
        schema: accountStatementTrackingSchema,
      });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
    }
    try {
      const { accountStatementId } = request.params();
      const accountStatementTracking =
        await AccountStatementTrackingProvider.updateOrCreateAccountStatementTracking(
          accountStatementId,
          payload
        );
      return response.ok(accountStatementTracking);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
