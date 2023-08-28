import {
  IAccountStatement,
  IGetAccountStatement,
  IUpdateAccountStatement,
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
  getAccountStatementById(id: number): Promise<IAccountStatement>;
  getLastAccountStatement(): Promise<IAccountStatement>;
  updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ): Promise<IAccountStatement>;
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
  // UPDATE AN ACCOUNT STATEMENT
  public async updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ) {
    const accountStatementFound = await AccountStatement.findOrFail(id);
    const resp = await accountStatementFound.merge(payload).save();
    return resp as IAccountStatement;
  }
  // GET AN ACCOUNT STATEMENT BY ID
  public async getAccountStatementById(id: number) {
    return await AccountStatement.findOrFail(id);
  }
  // GET LAST ACCOUNT STATEMENT
  public async getLastAccountStatement() {
    const lastAccountStatement = await AccountStatement.query()
      .orderBy("id", "desc")
      .firstOrFail();
    return lastAccountStatement.serialize() as IAccountStatement;
  }
}
