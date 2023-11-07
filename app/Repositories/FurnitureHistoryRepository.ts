import {
  IFurnitureHistory,
  IFurnitureHistorySchema,
} from "App/Interfaces/FurnitureHistory";
import FurnitureHistory from "App/Models/FutnitureHistory";

export interface IFurnitureHistoryRepository {
  createFurnitureHistory(
    payload: IFurnitureHistorySchema
  ): Promise<IFurnitureHistory>;
  getFurnitureHistoryById(id: number): Promise<IFurnitureHistory[]>;
}

export default class FurnitureHistoryRepository
  implements IFurnitureHistoryRepository
{
  // CREATE FURNITURE HISTORY
  public async createFurnitureHistory(payload: IFurnitureHistorySchema) {
    const newFurnitureHistory = new FurnitureHistory();
    await newFurnitureHistory.fill(payload).save();
    return newFurnitureHistory.serialize() as IFurnitureHistory;
  }
  // GET FURNITURE HISTORY BY ID
  public async getFurnitureHistoryById(furnitureId: number) {
    const furnitureHistoryQuery = FurnitureHistory.query();
    const furnitureHistoryFound = await furnitureHistoryQuery.where(
      "furnitureId",
      furnitureId
    );
    return furnitureHistoryFound;
  }
}
