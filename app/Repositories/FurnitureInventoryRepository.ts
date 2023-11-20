import { DATABASE_ERRORS, IDatabaseError } from "App/Constants/DatabaseErrors";
import {
  IFurnitureInventory,
  IFurnitureInventoryDate,
  IFurnitureInventoryPayload,
} from "App/Interfaces/FurnitureInventory";
import FurnitureInventory from "App/Models/FurnitureInventory";

export interface IFurnitureInventoryRepository {
  createFurnitureInventory(
    payload: IFurnitureInventoryPayload
  ): Promise<IFurnitureInventory[]>;
  getFurnitureInventoryDates(): Promise<IFurnitureInventoryDate[]>;
  getFurnitureInventoryByDates(
    dates: Array<string>
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
  // GET FURNITURE INVENTORY DATES
  public async getFurnitureInventoryDates() {
    const furnitureQuery = FurnitureInventory.query();
    const furnituresFound = await furnitureQuery.distinct("createdAt");
    return furnituresFound.map(
      (furniture) => furniture.serializeAttributes() as IFurnitureInventoryDate
    );
  }
  // FURNITURE INVENTORY BY DATE
  public async getFurnitureInventoryByDates(dates: Array<string>) {
    const furnitureInventoryQuery = FurnitureInventory.query();
    const furnitureInventory = await furnitureInventoryQuery
      .preload("furniture")
      .whereIn("createdAt", dates);
    return furnitureInventory.map(
      (el) => el.serializeAttributes() as IFurnitureInventory
    );
  }
}
