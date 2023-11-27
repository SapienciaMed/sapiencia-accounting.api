import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AssetInventoryProvider from "@ioc:core.AssetInventoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetInventorySchema } from "App/Interfaces/AssetInventory";
import { IInventoryDatesSchema } from "App/Interfaces/Common";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createAssetInventorySchema } from "App/Validators/AssetInventory/create";
import { generateXLSXAssetInventorySchema } from "App/Validators/AssetInventory/xlsxFiltersSchema";
import { inventoryDatesSchema } from "App/Validators/common/inventoryDatesSchema";

export default class AssetInventoryController {
  // CREATE ASSET INVENTORY
  public async createAssetInventory(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAssetInventorySchema;
    try {
      payload = await request.validate({ schema: createAssetInventorySchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAssetInventory =
        await AssetInventoryProvider.createAssetInventory(payload);
      return response.created(newAssetInventory);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ASSET INVENTORY XLSX
  public async generateAssetInventoryXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: { assetIds: string };
    try {
      filters = await request.validate({
        schema: generateXLSXAssetInventorySchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await AssetInventoryProvider.generateAssetInventoryXLSX(
        JSON.parse(filters.assetIds)
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
  // GET ASSET INVENTORY DATES
  public async getAssetInventoryDates(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const assetInventoryDatesFound =
        await AssetInventoryProvider.getAssetInventoryDates();
      return response.ok(assetInventoryDatesFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ASSET INVENTORY XLSX
  public async generateFullAssetInventoryXLSX(ctx: HttpContextContract) {
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
      const resp = await AssetInventoryProvider.generateFullAssetInventoryXLSX(
        JSON.parse(filters.inventoryDates)
      );
      response.header(
        "Content-Disposition",
        `attachment; filename=inventario_activos_tecnológicos.xlsx`
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
