import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ContractProvider from "@ioc:core.ContractProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IContractPaginateSchema,
  IContractSchema,
  IContractUpdateSchema,
} from "App/Interfaces/Contract";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import {
  createContractSchema,
  updateContractSchema,
} from "App/Validators/Contract/createContractSchema";
import { paginateContractSchema } from "App/Validators/Contract/paginateContractSchema";

export default class ContractController {
  // CREATE CONTRACT
  public async createContract(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IContractSchema;
    try {
      payload = await request.validate({ schema: createContractSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
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
      return DBException.badRequest(ctx, err);
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
  // GET CONTACT INFO SELECT
  public async getContractInfoSelect(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const newContract = await ContractProvider.getContractInfoSelect();
      return response.created(newContract);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET CONTRACT BY ID
  public async getContractById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const contractFound = await ContractProvider.getContractById(id);
      return response.ok(contractFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE CONTRACT BY ID
  public async updateContractById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IContractUpdateSchema;
    try {
      payload = await request.validate({
        schema: updateContractSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const contractEdited = await ContractProvider.updateContractById(
        id,
        payload
      );
      return response.ok(contractEdited);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // DELETE CONTRACT BY ID
  public async deleteContractById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const resp = await ContractProvider.deleteContractById(id);
      return response.ok(resp);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
