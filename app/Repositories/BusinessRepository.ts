import { IBusinessSchema } from "App/Interfaces/Business";
import Business from "App/Models/Business";
import { throwDatabaseError } from "App/Utils/databaseErrors";

export interface IBusinessRepository {
  createBusiness(
    payload: IBusinessSchema
  ): Promise<IBusinessSchema | undefined>;
  getAllBusiness(): Promise<IBusinessSchema[]>;
}

export default class BusinessRepository implements IBusinessRepository {
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    try {
      const newUser = new Business();
      return await newUser.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      throwDatabaseError(err);
    }
  }
  // GET ALL BUSINESS
  public async getAllBusiness() {
    return Business.all();
  }
}
