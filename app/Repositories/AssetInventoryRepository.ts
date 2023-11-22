import { DATABASE_ERRORS, IDatabaseError } from "App/Constants/DatabaseErrors";
import {
  IAssetInventory,
  IAssetInventoryDate,
  IAssetInventoryPayload,
} from "App/Interfaces/AssetInventory";
import AssetInventory from "App/Models/AssetInventory";

export interface IAssetInventoryRepository {
  createAssetInventory(
    payload: IAssetInventoryPayload
  ): Promise<IAssetInventory[]>;
  getAssetInventoryDates(): Promise<IAssetInventoryDate[]>;
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
  // GET ASSET INVENTORY DATES
  public async getAssetInventoryDates() {
    const assetQuery = AssetInventory.query();
    const assetsFound = await assetQuery.distinct("createdAt");
    return assetsFound.map(
      (asset) => asset.serializeAttributes() as IAssetInventoryDate
    );
  }
}
