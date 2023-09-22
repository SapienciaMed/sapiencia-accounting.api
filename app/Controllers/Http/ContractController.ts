import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ContractProvider from "@ioc:core.ContractProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IContractSchema } from "App/Interfaces/Contract";
import { ApiResponse } from "App/Utils/ApiResponses";
import { createContractSchema } from "App/Validators/Contract/createContractSchema";

export default class ContractController {
  // CREATE CONTRACT
  public async createContract(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IContractSchema;
    try {
      payload = await request.validate({ schema: createContractSchema });
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
      const newContract = await ContractProvider.createContract(payload);
      return response.created(newContract);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
