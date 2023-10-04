import { IFurniture } from "App/Interfaces/Furniture";
import Furniture from "App/Models/Furniture";

export interface IFurnitureRepository {
  createFurniture(payload: IFurniture): Promise<IFurniture>;
}

export default class FurnitureRepository implements IFurnitureRepository {
  // CREATE FURNITURE
  public async createFurniture(payload: IFurniture) {
    return await Furniture.create(payload);
  }
}
