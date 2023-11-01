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
