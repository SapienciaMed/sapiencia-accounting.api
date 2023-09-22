import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ContractProvider from "@ioc:core.ContractProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IContractPaginateSchema,
  IContractSchema,
} from "App/Interfaces/Contract";
import { ApiResponse } from "App/Utils/ApiResponses";
import { createContractSchema } from "App/Validators/Contract/createContractSchema";
import { paginateContractSchema } from "App/Validators/Contract/paginateContractSchema";

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
  // GET CONTRACT PAGINATED
  public async getContractPaginated(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IContractPaginateSchema;
    try {
      filters = await request.validate({
        schema: paginateContractSchema,
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
      const businessFound = await ContractProvider.getContractPaginated(
        filters
      );
      return response.ok(businessFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}