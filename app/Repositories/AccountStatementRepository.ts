import {
  IAccountStatement,
  IGetAccountStatement,
} from "App/Interfaces/AccountStatement";
import AccountStatement from "App/Models/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementRepository {
  createAccountStatement(
    payload: IAccountStatement
  ): Promise<IAccountStatement>;
  getAccountStatementFiltered(
    filters: IGetAccountStatement
  ): Promise<IPagingData<IAccountStatement>>;
  getAccountStatementById(id: number): Promise<IAccountStatement | null>;
}

export default class AccountStatementRepository
  implements IAccountStatementRepository
{
  // CREATE ACCOUNT STATEMENT
  public async createAccountStatement(payload: IAccountStatement) {
    const newAccountStatement = new AccountStatement();
    await newAccountStatement.fill({ ...payload }).save();
    return newAccountStatement.serialize() as IAccountStatement;
  }
  // GET ALL ACCOUNT STATEMENT FILTERED
  public async getAccountStatementFiltered(filters: IGetAccountStatement) {
    const { accountNum, contractCode, expirationDate, nit, page, perPage } =
      filters;
    const accountStatementQuery = AccountStatement.query();
    if (accountNum) {
      accountStatementQuery.where("accountNum", accountNum);
    }
    if (contractCode) {
      accountStatementQuery.where("contractCode", contractCode);
    }
    if (expirationDate) {
      accountStatementQuery.where("expirationDate", expirationDate.toString());
    }
    if (nit) {
      accountStatementQuery.preload("contract", (contractQuery) => {
        contractQuery.preload("business", (businessQuery) => {
          businessQuery.where("nit", nit);
        });
      });
    }
    const finalQuery = await accountStatementQuery.paginate(page, perPage);
    const { data, meta } = finalQuery.serialize();
    return { array: data as IAccountStatement[], meta };
  }
  // GET AN ACCOUNT STATEMENT BY ID
  public async getAccountStatementById(id: number) {
    return await AccountStatement.findOrFail(id);
  }
}
