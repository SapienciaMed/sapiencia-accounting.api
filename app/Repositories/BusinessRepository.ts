import { IBusinessSchema } from "App/Interfaces/Business";
import Business from "App/Models/Business";
import { throwDatabaseError } from "App/Utils/databaseErrors";

export interface IBusinessRepository {
  createBusiness(
    payload: IBusinessSchema
  ): Promise<IBusinessSchema | undefined>;
}

export default class BusinessRepository implements IBusinessRepository {
  public async createBusiness(payload: IBusinessSchema) {
    try {
      const newUser = new Business();
      return await newUser.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      throwDatabaseError(err);
    }
  }
}
