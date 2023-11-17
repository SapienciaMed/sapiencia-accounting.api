import {
  DATABASE_ERRORS,
  FURNITURE_SQL_ERROR,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import {
  IFiltersFurnitureSchema,
  IFurniture,
  IUpdateFurniture,
} from "App/Interfaces/Furniture";
import Furniture from "App/Models/Furniture";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IFurnitureRepository {
  createFurniture(payload: IFurniture): Promise<IFurniture>;
  getFurnitureById(id: number): Promise<Furniture>;
  getAllFurnituresPaginated(
    payload: IFiltersFurnitureSchema
  ): Promise<IPagingData<IFurniture>>;
  updateFurnitureById(
    id: number,
    payload: IUpdateFurniture
  ): Promise<IFurniture>;
  getFurnitureByPlate(plate: string): Promise<IFurniture>;
}

export default class FurnitureRepository implements IFurnitureRepository {
  // CREATE FURNITURE
  public async createFurniture(payload: IFurniture) {
    try {
      const newFurniture = new Furniture();
      await newFurniture.fill(payload).save();
      return newFurniture.serialize() as IFurniture;
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
      return await Furniture.findOrFail(id);
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Bien mueble inexistente");
      }
      throw new Error(err);
    }
  }
  // GET ALL FURNITURES PAGINATED
  public async getAllFurnituresPaginated(payload: IFiltersFurnitureSchema) {
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
      const startDate = acquisitionDate
        .startOf("day")
        .toFormat("yyyy-MM-dd HH:mm:ss");
      const endDate = acquisitionDate
        .endOf("day")
        .toFormat("yyyy-MM-dd HH:mm:ss");
      furnitureQuery.whereBetween("acquisitionDate", [startDate, endDate]);
    }
    if (equipmentStatus) {
      furnitureQuery.where("equipmentStatus", equipmentStatus);
    }
    const { data, meta } = (
      await furnitureQuery.paginate(page, perPage)
    ).serialize();
    return { array: data as IFurniture[], meta };
  }
  // UPDATE FURNITURE BY ID
  public async updateFurnitureById(
    id: number,
    payload: Partial<Omit<IFurniture, "plate">>
  ) {
    const furnitureFound = await this.getFurnitureById(id);
    return await furnitureFound.merge(payload).save();
  }
  // GET FURNITURE BY PLATE
  public async getFurnitureByPlate(plate: string) {
    try {
      const furnitureFound = await Furniture.findByOrFail("plate", plate);
      return furnitureFound.serializeAttributes() as IFurniture;
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Bien mueble inexistente");
      }
      throw new Error(err);
    }
  }
}
