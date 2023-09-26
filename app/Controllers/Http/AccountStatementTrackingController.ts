import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementTrackingProvider from "@ioc:core.AccountStatementTrackingProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatementTrackingPayload } from "App/Interfaces/AccountStatementTracking";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
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
      return DBException.badRequest(ctx, err);
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
