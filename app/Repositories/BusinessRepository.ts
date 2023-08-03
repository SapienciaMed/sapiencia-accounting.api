import { IBusiness } from "App/Interfaces/BusinessInterfaces";
import Business from "../Models/Business";

export interface IBusinessRepository {
  getBusinessById(id: number): Promise<IBusiness | null>;
}

export default class BusinessRepository implements IBusinessRepository {
  constructor() {}

  async getBusinessById(id: number): Promise<IBusiness | null> {
    const res = await Business.find(id);
    return res ? (res.serialize() as IBusiness) : null;
  }
}
