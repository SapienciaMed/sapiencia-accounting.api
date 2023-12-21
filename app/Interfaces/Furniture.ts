import { IDataPaginateFilters } from "App/Utils/ApiResponses";
import { DateTime } from "luxon";

export type IFurniture = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: number;
  userIdentification: string;
  fullName: string;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
};

export type IFurnitureRaw = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: number;
  userIdentification?: string;
  fullName?: string;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
};

export type IFurnitureMutated = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: string;
  userIdentification: string;
  fullName: string;
  area: string;
  model: string;
  brand: string;
  measure: string;
  activeOwner: string;
  observation: string;
  clerk: string;
};

export type IFurnitureSchema = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: number;
  workerId?: number;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
};

export interface IFiltersFurnitureSchema extends IDataPaginateFilters {
  plate?: string;
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
  createdFrom?: DateTime;
  createdUntil?: DateTime;
}

export type IUpdateFurnitureSchema = {
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
  workerId?: number;
  area?: number;
  model?: string;
  brand?: string;
  measure?: string;
  activeOwner?: number;
  observation?: string;
  clerk?: number;
};

export type IUpdateFurniture = {
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
  userIdentification: string;
  fullName: string;
  area?: number;
  model?: string;
  brand?: string;
  measure?: string;
  activeOwner?: number;
  observation?: string;
  clerk?: number;
};
