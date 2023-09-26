import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "./ApiResponses";

type IError = {
  rule: string;
  field: string;
  message: string;
};

type IMessage = {
  errors: IError[];
};

type IDbError = {
  messages: IMessage;
};

export class DBException {
  constructor(public ctx: HttpContextContract, public err: IDbError) {}
  public static badRequest(ctx: HttpContextContract, err: IDbError) {
    const { response, logger } = ctx;
    const validationErrors = err.messages?.errors ?? err;
    const validationErrorsStringify = JSON.stringify(validationErrors);
    logger.error(validationErrorsStringify);
    const apiResp = new ApiResponse(
      null,
      EResponseCodes.FAIL,
      validationErrorsStringify
    );
    return response.badRequest(apiResp);
  }
}
