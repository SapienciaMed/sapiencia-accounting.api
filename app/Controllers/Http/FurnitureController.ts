import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureProvider from "@ioc:core.FurnitureProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFurnitureSchema } from "App/Interfaces/Furniture";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createFurnitureSchema } from "App/Validators/Furniture/createFurnitureSchema";

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
  // CREATE FURNITURE
  public async createFurniture(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IFurnitureSchema;
    try {
      payload = await request.validate({ schema: createFurnitureSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newFurniture = await FurnitureProvider.createFurniture(payload);
      return response.created(newFurniture);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET FURNITURE BY ID
  public async getFurnitureById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const furnitureFound = await FurnitureProvider.getFurnitureById(id);
      return response.ok(furnitureFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}