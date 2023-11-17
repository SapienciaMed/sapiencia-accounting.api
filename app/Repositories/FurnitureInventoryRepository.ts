import { DATABASE_ERRORS, IDatabaseError } from "App/Constants/DatabaseErrors";
import {
  IFurnitureInventory,
  IFurnitureInventoryPayload,
} from "App/Interfaces/FurnitureInventory";
import FurnitureInventory from "App/Models/FurnitureInventory";

export interface IFurnitureInventoryRepository {
  createFurnitureInventory(
    payload: IFurnitureInventoryPayload
  ): Promise<IFurnitureInventory[]>;
}

export default class FurnitureInventoryRepository
  implements IFurnitureInventoryRepository
{
  // CREATE FURNITURE INVENTORY
  public async createFurnitureInventory(payload: IFurnitureInventoryPayload) {
    try {
      return await FurnitureInventory.createMany(payload);
    } catch (err) {
      const { code } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_NO_REFERENCED_ROW_2:
          throw new Error("Bien mueble inexistente");
        default:
          throw new Error(err);
      }
    }
  }
}
