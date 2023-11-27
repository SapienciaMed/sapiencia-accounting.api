import { DateTime } from "luxon";
import { IFurniture, IFurnitureMutated } from "./Furniture";

export type IFurnitureInventory = {
  id: number;
  furnitureId: number;
  userCreated: string;
  createdAt: DateTime;
  furniture: IFurniture;
  hour: string;
};

export type IFurnitureInventoryMutated = {
  id: number;
  furnitureId: number;
  userCreated: string;
  createdAt: DateTime;
  furniture: IFurnitureMutated;
  hour: string;
};

export type IFurnitureInventorySchema = {
  furnitureIds: Array<number>;
};

export type IFurnitureInventoryXLSXSchema = {
  furnitureIds: string;
};

export type IFurnitureInventoryPayload = Array<{
  furnitureId: number;
  hour: string;
  userCreated: string;
}>;

export type IFurnitureInventoryDate = {
  createdAt: string;
};
