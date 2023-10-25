import { DateTime } from "luxon";

export type IFurnitureHistory = {
  id: number; // BIH_CODIGO
  createdAt: DateTime | string; // BIH_FECHA
  changes: object; // BIH_CAMPOS_UPDATE
  furnitureId: number; // BIH_CODBIE_CODIGO
};

export type IFurnitureHistorySchema = {
  changes: object;
  furnitureId: number;
};
