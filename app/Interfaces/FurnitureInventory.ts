import { DateTime } from "luxon";

export type IFurnitureInventory = {
  id: number;
  furnitureId: number;
  userCreated: string;
  createdAt: DateTime;
  hour: string;
};

export type IFurnitureInventorySchema = {
  furnitureIds: Array<number>;
};

export type IFurnitureInventoryPayload = Array<{
  furnitureId: number;
  hour: string;
  userCreated: string;
}>;
