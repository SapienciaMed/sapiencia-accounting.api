import {
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import Business from "App/Models/Business";
import { throwDatabaseError } from "App/Utils/databaseErrors";

export interface IBusinessRepository {
  createBusiness(payload: IBusinessSchema): Promise<IBusinessSchema>;
  getAllBusiness(): Promise<IBusinessSchema[]>;
  getBusinessById(id: number): Promise<IBusinessSchema>;
  updateBusiness(
    id: number,
    payload: IBusinessUpdateSchema
  ): Promise<IBusinessSchema>;
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
    return Business.findOrFail(id);
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
}
