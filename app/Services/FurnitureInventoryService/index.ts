import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFurnitureInventory,
  IFurnitureInventorySchema,
} from "App/Interfaces/FurnitureInventory";
import FurnitureInventoryRepository from "App/Repositories/FurnitureInventoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { deleteRepetitions } from "App/Utils/helpers";
import { DateTime } from "luxon";

export interface IFurnitureInventoryService {
  createFurnitureInventory(
    payload: IFurnitureInventorySchema
  ): Promise<ApiResponse<IFurnitureInventory[]>>;
}

export default class FurnitureInventoryService
  implements IFurnitureInventoryService
{
  constructor(
    private furnitureInventoryRepository: FurnitureInventoryRepository
  ) {}
  // CREATE FURNITURE INVENTORY
  public async createFurnitureInventory(payload: IFurnitureInventorySchema) {
    const furnitureIdsCleaned = deleteRepetitions(payload.furnitureIds);
    const furnitureDataSorted = furnitureIdsCleaned.map((furnitureId) => ({
      furnitureId,
      hour: DateTime.now().hour.toString(),
      userCreated: Env.get("CURRENT_USER_DOCUMENT"),
    }));
    const assetInventoryCreated =
      await this.furnitureInventoryRepository.createFurnitureInventory(
        furnitureDataSorted
      );
    return new ApiResponse(assetInventoryCreated, EResponseCodes.OK);
  }
}
