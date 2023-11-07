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
  IContractUpdateSchema,
} from "App/Interfaces/Contract";
import Contract from "App/Models/Contract";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IContractRepository {
  createContract(payload: IContractSchema): Promise<Required<IContract>>;
  getContractPaginated(
    filters: IContractPaginateSchema
  ): Promise<IPagingData<IContractPaginated>>;
  getContractInfoSelect(): Promise<IContractInfo[]>;
  getContractById(id: number): Promise<IContract>;
  updateContractById(
    id: number,
    payload: IContractUpdateSchema
  ): Promise<IContract>;
  deleteContractById(id: number): Promise<void>;
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
  // GET CONTRACT BY ID
  public async getContractById(id: number) {
    try {
      const contractQuery = Contract.query();
      contractQuery.preload("business");
      contractQuery.where("id", id);
      return await contractQuery.firstOrFail();
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Contrato inexistente");
      }
      throw new Error(err);
    }
  }
  // UPDATE CONTRACT BY ID
  public async updateContractById(id: number, payload: IContractUpdateSchema) {
    const contractFound = await this.getContractById(id);
    return await contractFound.merge(payload).save();
  }
  // DELETE CONTRACT BY ID
  public async deleteContractById(id: number) {
    try {
      const contractFound = await this.getContractById(id);
      return await contractFound.delete();
    } catch (err) {
      const { code } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_ROW_IS_REFERENCED_2:
          throw new Error("No se puede eliminar contrato");
        default:
          throw new Error(err);
      }
    }
  }
}
