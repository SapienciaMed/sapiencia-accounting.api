import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureInventoryProvider from "@ioc:core.FurnitureInventoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IInventoryDatesSchema } from "App/Interfaces/Common";
import {
  IFurnitureInventorySchema,
  IFurnitureInventoryXLSXSchema,
} from "App/Interfaces/FurnitureInventory";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createFurnitureInventorySchema } from "App/Validators/FurnitureInventory/create";
import { generateXLSXFurnitureInventorySchema } from "App/Validators/FurnitureInventory/xlsxFiltersSchema";
import { inventoryDatesSchema } from "App/Validators/common/inventoryDatesSchema";

export default class FurnitureInventoryController {
  // CREATE FURNITURE INVENTORY
  public async createFurnitureInventory(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IFurnitureInventorySchema;
    try {
      payload = await request.validate({
        schema: createFurnitureInventorySchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newFurnitureInventory =
        await FurnitureInventoryProvider.createFurnitureInventory(payload);
      return response.created(newFurnitureInventory);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE FURNITURE INVENTORY XLSX
  public async generateFurnitureInventoryXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IFurnitureInventoryXLSXSchema;
    try {
      filters = await request.validate({
        schema: generateXLSXFurnitureInventorySchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp =
        await FurnitureInventoryProvider.generateFurnitureInventoryXLSX(
          JSON.parse(filters.furnitureIds)
        );
      response.header(
        "Content-Disposition",
        `attachment; filename=control_inventario.xlsx`
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET FURNITURE INVENTORY DATES
  public async getFurnitureInventoryDates(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const furnitureInventoryDatesFound =
        await FurnitureInventoryProvider.getFurnitureInventoryDates();
      return response.ok(furnitureInventoryDatesFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE FURNITURE INVENTORY XLSX
  public async generateFullFurnitureInventoryXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IInventoryDatesSchema;
    try {
      filters = await request.validate({
        schema: inventoryDatesSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp =
        await FurnitureInventoryProvider.generateFullFurnitureInventoryXLSX(
          JSON.parse(filters.inventoryDates)
        );
      response.header(
        "Content-Disposition",
        `attachment; filename=inventario_bienes_muebles.xlsx`
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}