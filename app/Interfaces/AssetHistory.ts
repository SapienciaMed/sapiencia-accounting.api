import { DateTime } from "luxon";
import { IAsset } from "./Asset";

export type IAssetHistory = {
  id: number;
  createdAt: DateTime;
  userModified: string;
  changes: IAssetHistoryChanges;
  assetId: number;
};

export type IAssetHistorySchema = {
  changes: IAssetHistoryChanges;
  assetId: number;
};

export type IAssetHistoryChanges = {
  oldChanges: Partial<IAsset>;
  newChanges: Partial<IAsset>;
};
