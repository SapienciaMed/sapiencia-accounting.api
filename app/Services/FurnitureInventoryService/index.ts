import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFurnitureInventory,
  IFurnitureInventorySchema,
} from "App/Interfaces/FurnitureInventory";
import FurnitureInventoryRepository from "App/Repositories/FurnitureInventoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import { deleteRepetitions } from "App/Utils/helpers";
import { DateTime } from "luxon";
import { IFurnitureService } from "../FurnitureService/FurnitureService";
import {
  furnitureXLSXFilePath,
  furnitureXLSXRows,
  furnitureXLSXcolumnNames,
} from "./XLSX";

export interface IFurnitureInventoryService {
  createFurnitureInventory(
    payload: IFurnitureInventorySchema
  ): Promise<ApiResponse<IFurnitureInventory[]>>;
  generateFurnitureInventoryXLSX(
    payload: IFurnitureInventorySchema
  ): Promise<ApiResponse<string>>;
}

export default class FurnitureInventoryService
  implements IFurnitureInventoryService
{
  constructor(
    private furnitureInventoryRepository: FurnitureInventoryRepository,
    private furnitureService: IFurnitureService
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
  // GENERATE FURNITURE INVENTORY XLSX
  public async generateFurnitureInventoryXLSX(
    payload: IFurnitureInventorySchema
  ) {
    const furnituresFound = await this.furnitureService.getManyFurnituresByIds(
      payload.furnitureIds
    );
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      data: furnitureXLSXRows(furnituresFound),
      filePath: furnitureXLSXFilePath,
      worksheetName: "Control inventario bienes muebles",
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }
}
