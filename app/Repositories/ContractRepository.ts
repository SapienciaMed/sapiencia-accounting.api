import { IContract, IContractSchema } from "App/Interfaces/Contract";
import Contract from "App/Models/Contract";
import { throwDatabaseError } from "App/Utils/databaseErrors";

export interface IContractRepository {
  createContract(payload: IContractSchema): Promise<Required<IContract>>;
}

export default class ContractRepository implements IContractRepository {
  public async createContract(payload: IContractSchema) {
    try {
      const newContract = new Contract();
      return await newContract.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      return throwDatabaseError(err);
    }
  }
}
