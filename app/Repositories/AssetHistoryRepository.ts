import Env from "@ioc:Adonis/Core/Env";
import {
  IAssetHistory,
  IAssetHistorySchema,
} from "App/Interfaces/AssetHistory";
import AssetHistory from "App/Models/AssetHistory";

export interface IAssetHistoryRepository {
  createAssetHistory(payload: IAssetHistorySchema): Promise<IAssetHistory>;
}

export default class AssetHistoryRepository implements IAssetHistoryRepository {
  // CREATE ASSET HISTORY
  public async createAssetHistory(payload: IAssetHistorySchema) {
    return await AssetHistory.create({
      ...payload,
      userModified: Env.get("CURRENT_USER_DOCUMENT"),
    });
  }
}
