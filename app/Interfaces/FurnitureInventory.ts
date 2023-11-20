import Furniture from "App/Models/Furniture";
import { DateTime } from "luxon";

export type IFurnitureInventory = {
  id: number;
  furnitureId: number;
  userCreated: string;
  createdAt: DateTime;
  furniture: Furniture;
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

export type IFurnitureInventoryDate = {
  createdAt: string;
};
