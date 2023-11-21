import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFurnitureInventory,
  IFurnitureInventoryDate,
  IFurnitureInventoryMutated,
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
import {
  furnitureInventoryXLSXFilePath,
  furnitureInventoryXLSXRows,
  furnitureInventoryXLSXcolumnNames,
} from "./inventoryXLSX";

export interface IFurnitureInventoryService {
  createFurnitureInventory(
    payload: IFurnitureInventorySchema
  ): Promise<ApiResponse<IFurnitureInventory[]>>;
  generateFurnitureInventoryXLSX(
    furnitureIds: Array<number>
  ): Promise<ApiResponse<string>>;
  getFurnitureInventoryDates(): Promise<ApiResponse<IFurnitureInventoryDate[]>>;
  generateFullFurnitureInventoryXLSX(
    inventoryDates: Array<string>
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
  public async generateFurnitureInventoryXLSX(furnitureIds: Array<number>) {
    const furnituresFound = await this.furnitureService.getManyFurnituresByIds(
      furnitureIds
    );
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      data: furnitureXLSXRows(furnituresFound),
      filePath: furnitureXLSXFilePath,
      worksheetName: "Control inventario bienes muebles",
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }
  // GET FURNITURE INVENTORY DATES
  public async getFurnitureInventoryDates() {
    const furnitureInventoryDatesFound =
      await this.furnitureInventoryRepository.getFurnitureInventoryDates();
    return new ApiResponse(furnitureInventoryDatesFound, EResponseCodes.OK);
  }
  // GET FULL FURNITURE INVENTORY BY DATES
  async generateFullFurnitureInventoryXLSX(inventoryDates: Array<string>) {
    const furnitureInventory =
      await this.furnitureInventoryRepository.getFurnitureInventoryByDates(
        inventoryDates
      );
    let furnitureInventoryMutated: IFurnitureInventoryMutated[] = [];
    for (let inventory of furnitureInventory) {
      const { furniture } = inventory;
      const furnitureJoined =
        await this.furnitureService.getCompleteFurnitureInfo(furniture);
      furnitureInventoryMutated.push({
        ...inventory,
        furniture: furnitureJoined,
      });
    }
    await generateXLSX({
      columns: furnitureInventoryXLSXcolumnNames,
      data: furnitureInventoryXLSXRows(furnitureInventoryMutated),
      filePath: furnitureInventoryXLSXFilePath,
      worksheetName: "Control inventario bienes muebles",
    });
    return new ApiResponse(furnitureInventoryXLSXFilePath, EResponseCodes.OK);
  }
}
