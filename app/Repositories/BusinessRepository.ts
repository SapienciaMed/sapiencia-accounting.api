import { IBusiness } from "App/Interfaces/BusinessInterfaces";
import BusinessName from "App/Models/BusinessName";

export interface IBusinessRepository {
  getBusinessById(id: number): Promise<IBusiness | null>;
}

export default class BusinessRepository implements IBusinessRepository {
  constructor() {}

  async getBusinessById(id: number): Promise<IBusiness | null> {
    const res = await BusinessName.find(id);
    return res ? (res.serialize() as IBusiness) : null;
  }
}
