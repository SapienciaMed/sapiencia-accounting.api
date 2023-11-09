import Env from "@ioc:Adonis/Core/Env";
import {
  IAssetHistory,
  IAssetHistorySchema,
} from "App/Interfaces/AssetHistory";
import AssetHistory from "App/Models/AssetHistory";

export interface IAssetHistoryRepository {
  getAssetHistoryById(assetId: number): Promise<IAssetHistory[]>;
  createAssetHistory(payload: IAssetHistorySchema): Promise<IAssetHistory>;
}

export default class AssetHistoryRepository implements IAssetHistoryRepository {
  // GET ASSET HISTORY BY ID
  public async getAssetHistoryById(assetId: number) {
    try {
      const assetHistoryQuery = AssetHistory.query();
      const historyFound = await assetHistoryQuery.where("assetId", assetId);
      return historyFound.map(
        (item) => item.serializeAttributes() as IAssetHistory
      );
    } catch (err) {
      throw err;
    }
  }
  // CREATE ASSET HISTORY
  public async createAssetHistory(payload: IAssetHistorySchema) {
    return await AssetHistory.create({
      ...payload,
      userModified: Env.get("CURRENT_USER_DOCUMENT"),
    });
  }
}
