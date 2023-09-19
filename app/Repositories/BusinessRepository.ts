import {
  IBusinessInfoSelect,
  IBusinessPaginateFilters,
  IBusinessPaginated,
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import Business from "App/Models/Business";
import { IPagingData } from "App/Utils/ApiResponses";
import { throwDatabaseError } from "App/Utils/databaseErrors";

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
}

export default class BusinessRepository implements IBusinessRepository {
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    try {
      const newUser = new Business();
      return await newUser.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      return throwDatabaseError(err);
    }
  }
  // GET ALL BUSINESS
  public async getAllBusiness() {
    return Business.all();
  }
  // GET BUSINESS BY ID
  public async getBusinessById(id: number) {
    return await Business.findOrFail(id);
  }
  // UPDATE BUSINESS
  public async updateBusiness(id: number, payload: IBusinessUpdateSchema) {
    try {
      const businessFound = await this.getBusinessById(id);
      return await businessFound.merge(payload).save();
    } catch (err) {
      return throwDatabaseError(err);
    }
  }
  // GET ALL BUSINESS INFO TO FILL SELECT
  public async getAllBusinessInfo() {
    const businessFound = await this.getAllBusiness();
    const businessInfoSelect = businessFound.map((business) => {
      const { id, name, nit } = business;
      return {
        value: id,
        name: `${nit} ${name.toLocaleUpperCase()}`,
      };
    });
    return businessInfoSelect;
  }
  // GET ALL ACCOUNT STATEMENT FILTERED
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
}
