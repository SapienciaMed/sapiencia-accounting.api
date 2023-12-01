import { DateTime } from "luxon";

export type IAsset = {
  id: number;
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
  userModified: string;
  updatedAt: DateTime;
  userCreated: string;
  createdAt: DateTime;
};

export type IAssetFullInfo = IAsset & {
  clerk: string;
  ownerFullName: string;
};

export type IAssetSchema = {
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
  cpu?: string;
  ram?: string;
  storage?: string;
  os?: string;
  observations?: string;
};

export type IUpdateAssetSchema = {
  type?: string;
  campus?: string;
  area?: string;
  status?: string;
  ownerId?: string;
  ownerDate?: DateTime;
  equipmentType?: string;
  brand?: string;
  model?: string;
  cpu?: string;
  ram?: string;
  storage?: string;
  os?: string;
  observations?: string;
};

export type IAssetsFilters = Partial<
  Pick<IAsset, "type" | "campus" | "ownerId" | "plate" | "serial">
> & {
  page: number;
  perPage: number;
  createdFrom?: DateTime;
  createdUntil?: DateTime;
};
