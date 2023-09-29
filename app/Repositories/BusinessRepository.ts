import {
  BusinessModelError,
  DATABASE_ERRORS,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import {
  IBusinessInfoSelect,
  IBusinessPaginateFilters,
  IBusinessPaginated,
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import Business from "App/Models/Business";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IBusinessRepository {
  createBusiness(payload: IBusinessSchema): Promise<IBusinessSchema>;
  getAllBusiness(): Promise<IBusinessSchema[]>;
  getBusinessById(id: number): Promise<IBusinessSchema>;
  updateBusiness(
    id: number,
    payload: IBusinessUpdateSchema
  ): Promise<IBusinessSchema>;
  getAllBusinessInfo(): Promise<IBusinessInfoSelect[]>;
  getBusinessPaginated(
    filters: IBusinessPaginateFilters
  ): Promise<IPagingData<IBusinessSchema>>;
  deleteBusinessById(id: number): Promise<void>;
}

export default class BusinessRepository implements IBusinessRepository {
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    try {
      const newUser = new Business();
      return await newUser.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(BusinessModelError.NIT_DUPLICATE)) {
            throw new Error("El Nit ingresado ya existe");
          }
        default:
          throw new Error(err);
      }
    }
  }
  // GET ALL BUSINESS
  public async getAllBusiness() {
    return Business.all();
  }
  // GET BUSINESS BY ID
  public async getBusinessById(id: number) {
    try {
      const businessFound = await Business.findOrFail(id);
      return businessFound;
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Razón social inexistente");
      }
      throw new Error(err);
    }
  }
  // UPDATE BUSINESS
  public async updateBusiness(id: number, payload: IBusinessUpdateSchema) {
    try {
      const businessFound = await this.getBusinessById(id);
      return await businessFound.merge(payload).save();
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(BusinessModelError.NIT_DUPLICATE)) {
            throw new Error("El Nit ingresado ya existe");
          }
        default:
          throw new Error(err);
      }
    }
  }
  // GET ALL BUSINESS INFO TO FILL SELECT
  public async getAllBusinessInfo() {
    const businessFound = await this.getAllBusiness();
    const businessInfoSelect = businessFound.map((business) => {
      const {
        id,
        name,
        nit,
        municipalityCode,
        address,
        phone,
        email,
        sender,
        chargeSender,
      } = business;
      return {
        value: id,
        name: `${nit} ${name.toLocaleUpperCase()}`,
        data: {
          municipalityCode,
          name,
          address,
          phone,
          email,
          sender,
          nit,
          chargeSender,
          municipality: "",
        },
      };
    });
    return businessInfoSelect;
  }
  // GET ALL BUSINESS FILTERED
  public async getBusinessPaginated(filters: IBusinessPaginateFilters) {
    const { id, page, perPage } = filters;
    const businessQuery = Business.query();
    businessQuery.where("id", id);
    const omit = ["userModified", "userCreate", "createdAt", "updatedAt"];
    const { data, meta } = (
      await businessQuery.paginate(page, perPage)
    ).serialize({ fields: { omit } });
    return { array: data as IBusinessPaginated[], meta };
  }
  // DELETE BUSINESS BY ID
  public async deleteBusinessById(id: number) {
    try {
      const businessFound = await this.getBusinessById(id);
      await businessFound.delete();
    } catch (err) {
      const { code } = err as IDatabaseError;
      if (code === DATABASE_ERRORS.ER_ROW_IS_REFERENCED_2) {
        throw new Error("No se puede eliminar razón social");
      }
      throw new Error(err);
    }
  }
}
