import { DateTime } from "luxon";
import { IFurniture, IFurnitureMutated } from "./Furniture";

export type IFurnitureHistory = {
  id: number; // BIH_CODIGO
  createdAt: DateTime | string; // BIH_FECHA
  changes: IFurnitureHistoryChanges; // BIH_CAMPOS_UPDATE
  furnitureId: number; // BIH_CODBIE_CODIGO
};

export type IFurnitureHistoryMutated = {
  id: number;
  createdAt: DateTime | string;
  changes: IFurnitureHistoryChangesMutated;
  furnitureId: number;
};

type IFurnitureHistoryChangesMutated = {
  oldChanges: Partial<IFurnitureMutated>;
  newChanges: Partial<IFurnitureMutated>;
};

export type IFurnitureHistoryChanges = {
  oldChanges: Partial<IFurniture>;
  newChanges: Partial<IFurniture>;
};

export type IFurnitureHistorySchema = {
  changes: IFurnitureHistoryChanges;
  furnitureId: number;
};
