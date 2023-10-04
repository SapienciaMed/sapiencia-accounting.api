import {
  DATABASE_ERRORS,
  FURNITURE_SQL_ERROR,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import { IFurniture } from "App/Interfaces/Furniture";
import Furniture from "App/Models/Furniture";

export interface IFurnitureRepository {
  createFurniture(payload: IFurniture): Promise<IFurniture>;
  getFurnitureById(id: number): Promise<IFurniture>;
}

export default class FurnitureRepository implements IFurnitureRepository {
  // CREATE FURNITURE
  public async createFurniture(payload: IFurniture) {
    try {
      return await Furniture.create(payload);
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(FURNITURE_SQL_ERROR.PLATE_DUPLICATE)) {
            throw new Error("El bien inmueble ingresado ya existe");
          }
        default:
          throw new Error(err);
      }
    }
  }
  // GET FURNITURE BY ID
  public async getFurnitureById(id: number) {
    try {
      const furnitureQuery = Furniture.query();
      furnitureQuery.where("id", id);
      return await furnitureQuery.firstOrFail();
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Bien mueble inexistente");
      }
      throw new Error(err);
    }
  }
}
