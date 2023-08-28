import { IBusiness } from "App/Interfaces/BusinessInterface";
import { IBusinessRepository } from "App/Repositories/BusinessRepository";

export class BusinessRepositoryFake implements IBusinessRepository {
  getBusinessById(_id: number): Promise<IBusiness | null> {
    return new Promise((res) => {
      res(null);
    });
  }
}
