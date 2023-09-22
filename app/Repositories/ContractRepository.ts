import {
  IContract,
  IContractPaginateSchema,
  IContractPaginated,
  IContractSchema,
} from "App/Interfaces/Contract";
import Contract from "App/Models/Contract";
import { IPagingData } from "App/Utils/ApiResponses";
import { throwDatabaseError } from "App/Utils/databaseErrors";

export interface IContractRepository {
  createContract(payload: IContractSchema): Promise<Required<IContract>>;
  getContractPaginated(
    filters: IContractPaginateSchema
  ): Promise<IPagingData<IContractPaginated>>;
  getContractInfoSelect(): Promise<IContract[]>;
}

export default class ContractRepository implements IContractRepository {
  // CREATE CONTRACT
  public async createContract(payload: IContractSchema) {
    try {
      const newContract = new Contract();
      return await newContract.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      return throwDatabaseError(err);
    }
  }
  // GET CONTRACT PAGINATED
  public async getContractPaginated(filters: IContractPaginateSchema) {
    const { id, businessCode, page, perPage } = filters;
    const contractQuery = Contract.query();
    contractQuery.preload("business", (businessQuery) => {
      businessQuery.select("name", "nit");
    });
    if (id) {
      contractQuery.where("id", id);
    }
    if (businessCode) {
      contractQuery.where("businessCode", businessCode);
    }
    const omit = ["userModified", "userCreate", "createdAt", "updatedAt"];
    const { data, meta } = (
      await contractQuery.paginate(page, perPage)
    ).serialize({ fields: { omit } });
    return { array: data as IContractPaginated[], meta };
  }
  // GET CONTRACT INGO SELECT
  public async getContractInfoSelect() {
    const contractsFound = await Contract.all();
    return contractsFound;
  }
}
