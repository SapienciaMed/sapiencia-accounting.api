import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FurnitureInventoryProvider from "@ioc:core.FurnitureInventoryProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFurnitureInventorySchema } from "App/Interfaces/FurnitureInventory";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createFurnitureInventorySchema } from "App/Validators/FurnitureInventory/create";

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
}
