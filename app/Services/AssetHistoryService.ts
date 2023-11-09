import { GENERIC_LIST } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAssetChanges, IAssetHistory } from "App/Interfaces/AssetHistory";
import { IGenericItem } from "App/Interfaces/GenericMaster";
import AssetHistoryRepository from "App/Repositories/AssetHistoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";

export interface IAssetHistoryService {
  getAssetHistoryById(id: number): Promise<ApiResponse<IAssetHistory[]>>;
}

export default class AssetHistoryService implements IAssetHistoryService {
  constructor(
    private assetHistoryRepository: AssetHistoryRepository,
    private genericMasterService: GenericMasterExternalService
  ) {}
  // GET ASSET HISTORY BY ID
  public async getAssetHistoryById(assetId: number) {
    const assetHistoryFound =
      await this.assetHistoryRepository.getAssetHistoryById(assetId);
    const joinGenericDataToHistory = async (
      changes: Partial<IAssetChanges>
    ) => {
      let changesResolved: Partial<IAssetChanges> = {};
      for (const [key, value] of Object.entries(changes)) {
        let genericData: IGenericItem = {
          id: 0,
          grouper: "",
          itemCode: "",
          itemDescription: "",
          additionalFields: {},
        };
        if (key === "campus") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.CAMPUS,
              value.toString()
            );
        } else if (key === "area") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.AREA,
              value.toString()
            );
        } else if (key === "status") {
          genericData =
            await this.genericMasterService.getGenericItemDescriptionByItemCode(
              GENERIC_LIST.EQUIPMENT_STATUS,
              value.toString()
            );
        }
        changesResolved[key] =
          genericData.itemDescription === ""
            ? value
            : genericData.itemDescription;
      }
      return changesResolved;
    };
    let assetHistoryMutated: IAssetHistory[] = [];
    for (let assetModification of assetHistoryFound) {
      const { oldChanges, newChanges } = assetModification.changes;
      const oldChangesResolved = await joinGenericDataToHistory(oldChanges);
      const newChangesResolved = await joinGenericDataToHistory(newChanges);
      const auxAssetModification = {
        ...assetModification,
        changes: {
          oldChanges: oldChangesResolved ?? {},
          newChanges: newChangesResolved ?? {},
        },
      };
      assetHistoryMutated.push(auxAssetModification);
    }
    return new ApiResponse(assetHistoryMutated, EResponseCodes.OK);
  }
}
