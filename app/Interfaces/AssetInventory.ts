import { DateTime } from "luxon";

export type IAssetInventory = {
  id: number;
  assetId: number;
  userCreated: string;
  createdAt: DateTime;
  hour: string;
};

export type IAssetInventorySchema = {
  assetIds: Array<number>;
};

export type IAssetInventoryPayload = Array<{
  assetId: number;
  hour: string;
  userCreated: string;
}>;

export type IAssetInventoryDate = {
  createdAt: string;
};
