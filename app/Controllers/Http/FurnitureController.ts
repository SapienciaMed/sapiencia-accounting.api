import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureProvider from "@ioc:core.FurnitureProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFiltersFurnitureSchema,
  IFurnitureSchema,
  IUpdateFurnitureSchema,
} from "App/Interfaces/Furniture";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createFurnitureSchema } from "App/Validators/Furniture/createFurnitureSchema";
import { filtersFurnitureSchema } from "App/Validators/Furniture/filtersFurnitureSchema";
import { updateFurnitureSchema } from "App/Validators/Furniture/updateFurnitureSchema";

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
      const apiResp = new ApiResponse([], EResponseCodes.FAIL, err.message);
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
      const apiResp = new ApiResponse([], EResponseCodes.FAIL, err.message);
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
  // GET FURNITURE BY ID RAW
  public async getFurnitureByIdRaw(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const furnitureFound = await FurnitureProvider.getFurnitureByIdRaw(id);
      return response.ok(furnitureFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL FURNITURES PAGINATED
  public async getAllFurnituresPaginated(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IFiltersFurnitureSchema;
    try {
      filters = await request.validate({ schema: filtersFurnitureSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const furnituresFound = await FurnitureProvider.getAllFurnituresPaginated(
        filters
      );
      return response.ok(furnituresFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE FURNITURE BY ID
  public async updateFurnitureById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IUpdateFurnitureSchema;
    try {
      payload = await request.validate({ schema: updateFurnitureSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const furnitureUpdate = await FurnitureProvider.updateFurnitureById(
        id,
        payload
      );
      return response.ok(furnitureUpdate);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE FURNITURE XLSX
  public async generateFurnitureXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IFiltersFurnitureSchema;
    try {
      filters = await request.validate({ schema: filtersFurnitureSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await FurnitureProvider.generateFurnitureXLSX(filters);
      response.header(
        "Content-Disposition",
        `attachment; filename=activos_fijos.xlsx`
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
