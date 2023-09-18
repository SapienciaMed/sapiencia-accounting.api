import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BusinessProvider from "@ioc:core.BusinessProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import { ApiResponse } from "App/Utils/ApiResponses";
import { createBusinessSchema } from "App/Validators/Business/createBusinessSchema";
import { updateBusinessSchema } from "App/Validators/Business/updateBusinessSchema";

export default class BusinessController {
  // CREATE BUSINESS
  public async createBusiness(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IBusinessSchema;
    try {
      payload = await request.validate({ schema: createBusinessSchema });
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
      const newBusiness = await BusinessProvider.createBusiness(payload);
      return response.created(newBusiness);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL BUSINESS
  public async getAllBusiness(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const businessFound = await BusinessProvider.getAllBusiness();
      return response.created(businessFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE BUSINESS
  public async updateBusiness(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IBusinessUpdateSchema;
    try {
      payload = await request.validate({ schema: updateBusinessSchema });
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
      const { id } = request.params();
      const businessUpdated = await BusinessProvider.updateBusiness(
        id,
        payload
      );
      return response.ok(businessUpdated);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
