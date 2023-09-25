import {
  CONTRACT_SQL_ERROR,
  DATABASE_ERRORS,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import {
  IContract,
  IContractInfo,
  IContractPaginateSchema,
  IContractPaginated,
  IContractSchema,
} from "App/Interfaces/Contract";
import Contract from "App/Models/Contract";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IContractRepository {
  createContract(payload: IContractSchema): Promise<Required<IContract>>;
  getContractPaginated(
    filters: IContractPaginateSchema
  ): Promise<IPagingData<IContractPaginated>>;
  getContractInfoSelect(): Promise<IContractInfo[]>;
}

export default class ContractRepository implements IContractRepository {
  // CREATE CONTRACT
  public async createContract(payload: IContractSchema) {
    try {
      const newContract = new Contract();
      return await newContract.fill({ ...payload, userCreate: "foo" }).save();
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(CONTRACT_SQL_ERROR.NUM_CONTRACT_DUPLICATE)) {
            throw new Error("El contrato ingresado ya existe");
          }
        default:
          throw new Error(err);
      }
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
    const contractQuery = Contract.query();
    contractQuery.preload("business", (businessQuery) => {
      businessQuery.select("name", "nit");
    });
    const contractsFound = await contractQuery.finally();
    return contractsFound;
  }
}
