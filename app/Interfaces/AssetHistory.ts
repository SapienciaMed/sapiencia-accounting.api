import { DateTime } from "luxon";

export type IAssetChanges = {
  type: string;
  campus: string;
  area: string;
  status: string;
  ownerId: string;
  ownerDate: DateTime;
  equipmentType: string;
  brand: string;
  model: string;
  plate: string;
  serial: string;
  cpu: string;
  ram: string;
  storage: string;
  os: string;
  observations: string;
};

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
  oldChanges: Partial<IAssetChanges>;
  newChanges: Partial<IAssetChanges>;
};
