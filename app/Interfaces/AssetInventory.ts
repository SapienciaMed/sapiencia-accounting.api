import Asset from "App/Models/Asset";
import { DateTime } from "luxon";
import { IAssetFullInfo } from "./Asset";

export type IAssetInventory = {
  id: number;
  assetId: number;
  asset: Asset;
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

export type IAssetInventoryFullInfo = {
  id: number;
  assetId: number;
  asset: IAssetFullInfo;
  userCreated: string;
  createdAt: DateTime;
  hour: string;
};
