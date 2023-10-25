import { GENERIC_LIST } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFurnitureHistory,
  IFurnitureHistoryMutated,
} from "App/Interfaces/FurnitureHistory";
import { IGenericItem } from "App/Interfaces/GenericMaster";
import FurnitureHistoryRepository from "App/Repositories/FurnitureHistoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";

export interface IFurnitureHistoryService {
  getFurnitureHistoryById(
    id: number
  ): Promise<ApiResponse<IFurnitureHistoryMutated[]>>;
}

export default class FurnitureHistoryService
  implements IFurnitureHistoryService
{
  constructor(
    private furnitureHistoryRepository: FurnitureHistoryRepository,
    private genericMasterService: GenericMasterExternalService
  ) {}
  // GET FURNITURE HISTORY BY ID
  public async getFurnitureHistoryById(furnitureId: number) {
    const furnitureHistoryFound =
      await this.furnitureHistoryRepository.getFurnitureHistoryById(
        furnitureId
      );
    let furnituresHistoryMutated: IFurnitureHistoryMutated[] = [];
    for (let history of furnitureHistoryFound) {
      const historyData = history.serialize() as IFurnitureHistory;
      let furnitureHistoryMutated: IFurnitureHistoryMutated = {
        ...historyData,
        changes: {
          oldChanges: {},
          newChanges: {},
        },
      };
      const { oldChanges, newChanges } = history.changes;
      for (const [key, value] of Object.entries(oldChanges)) {
        let genericData: IGenericItem = {
          id: 0,
          grouper: "",
          itemCode: "",
          itemDescription: "",
          additionalFields: {},
        };
        if (key === "area") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.AREA,
              Number(value)
            );
        } else if (key === "equipmentStatus") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.EQUIPMENT_STATUS,
              Number(value)
            );
        } else if (key === "activeOwner") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.CLERK,
              Number(value)
            );
        } else if (key === "clerk") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.ACTIVE_OWNER,
              Number(value)
            );
        }
        furnitureHistoryMutated.changes.oldChanges[key] =
          genericData.itemDescription === ""
            ? value
            : genericData.itemDescription;
      }
      for (const [key, value] of Object.entries(newChanges)) {
        let genericData: IGenericItem = {
          id: 0,
          grouper: "",
          itemCode: "",
          itemDescription: "",
          additionalFields: {},
        };
        if (key === "area") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.AREA,
              Number(value)
            );
        } else if (key === "equipmentStatus") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.EQUIPMENT_STATUS,
              Number(value)
            );
        } else if (key === "activeOwner") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.CLERK,
              Number(value)
            );
        } else if (key === "clerk") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.ACTIVE_OWNER,
              Number(value)
            );
        }
        furnitureHistoryMutated.changes.newChanges[key] =
          genericData.itemDescription === ""
            ? value
            : genericData.itemDescription;
      }
      furnituresHistoryMutated.push(furnitureHistoryMutated);
    }
    return new ApiResponse(furnituresHistoryMutated, EResponseCodes.OK);
  }
}
