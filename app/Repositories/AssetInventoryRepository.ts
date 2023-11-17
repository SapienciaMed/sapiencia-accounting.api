import { DATABASE_ERRORS, IDatabaseError } from "App/Constants/DatabaseErrors";
import {
  IAssetInventory,
  IAssetInventoryPayload,
} from "App/Interfaces/AssetInventory";
import AssetInventory from "App/Models/AssetInventory";

export interface IAssetInventoryRepository {
  createAssetInventory(
    payload: IAssetInventoryPayload
  ): Promise<IAssetInventory[]>;
}

export default class AssetInventoryRepository
  implements IAssetInventoryRepository
{
  // CREATE ASSET INVENTORY
  public async createAssetInventory(payload: IAssetInventoryPayload) {
    try {
      return await AssetInventory.createMany(payload);
    } catch (err) {
      const { code } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_NO_REFERENCED_ROW_2:
          throw new Error("Activo inexistente");
        default:
          throw new Error(err);
      }
    }
  }
}
