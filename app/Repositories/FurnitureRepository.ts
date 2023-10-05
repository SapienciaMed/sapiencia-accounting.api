import {
  DATABASE_ERRORS,
  FURNITURE_SQL_ERROR,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import { IFurniture, IFurnitureUpdateSchema } from "App/Interfaces/Furniture";
import Furniture from "App/Models/Furniture";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IFurnitureRepository {
  createFurniture(payload: IFurniture): Promise<IFurniture>;
  getFurnitureById(id: number): Promise<IFurniture>;
  getAllFurnituresPaginated(
    payload: IFurnitureUpdateSchema
  ): Promise<IPagingData<IFurniture>>;
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
      return (
        await furnitureQuery.firstOrFail()
      ).serializeAttributes() as IFurniture;
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Bien mueble inexistente");
      }
      throw new Error(err);
    }
  }
  // GET ALL FURNITURES PAGINATED
  public async getAllFurnituresPaginated(payload: IFurnitureUpdateSchema) {
    const {
      page,
      perPage,
      plate,
      description,
      acquisitionDate,
      equipmentStatus,
    } = payload;
    const furnitureQuery = Furniture.query();
    if (plate) {
      furnitureQuery.where("plate", plate);
    }
    if (description) {
      furnitureQuery.where("description", description);
    }
    if (acquisitionDate) {
      // furnitureQuery.where("acquisitionDate", acquisitionDate)
    }
    if (equipmentStatus) {
      furnitureQuery.where("equipmentStatus", equipmentStatus);
    }
    const { data, meta } = (
      await furnitureQuery.paginate(page, perPage)
    ).serialize();
    return { array: data as IFurniture[], meta };
  }
}
