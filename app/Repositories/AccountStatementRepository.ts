import Logger from "@ioc:Adonis/Core/Logger";
import {
  IAccountStatement,
  IGetAccountStatement,
  IGetAccountStatementPaginated,
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
  ): Promise<IPagingData<IGetAccountStatementPaginated>>;
  getAccountStatementById(id: number): Promise<IGetAccountStatementPaginated>;
  getLastAccountStatement(): Promise<IAccountStatement>;
  updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ): Promise<IAccountStatement>;
  getAccountStatementByAccountNum(
    accountNum: number
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
    const { accountNum, contractCode, expeditionDate, nit, page, perPage } =
      filters;
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("tracking", (trackingQuery) => {
      trackingQuery.preload("status");
    });
    accountStatementQuery.preload("contract", (contractQuery) => {
      contractQuery.preload("business");
    });
    if (accountNum) {
      accountStatementQuery.where("accountNum", accountNum);
    }
    if (contractCode) {
      accountStatementQuery.where("contractCode", contractCode);
    }
    if (expeditionDate) {
      const auxExpeditionDate = expeditionDate.setLocale("zh").toSQLDate();
      if (auxExpeditionDate !== null) {
        accountStatementQuery.where("expeditionDate", auxExpeditionDate);
      }
    }
    if (nit) {
      accountStatementQuery.whereHas("contract", (contractQuery) => {
        contractQuery.whereHas("business", (businessQuery) => {
          businessQuery.where("nit", nit);
        });
      });
    }
    const finalQuery = await accountStatementQuery.paginate(page, perPage);
    const { data, meta } = finalQuery.serialize();
    return { array: data as IGetAccountStatementPaginated[], meta };
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
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("contract", (contractQuery) => {
      contractQuery.preload("business");
    });
    accountStatementQuery.where("id", id);
    const accountStatementFound = await accountStatementQuery.first();
    if (!accountStatementFound) {
      throw new Error(`Cuenta de cobro con id ${id} no existe`);
    }
    return accountStatementFound.serialize() as IGetAccountStatementPaginated;
  }
  // GET LAST ACCOUNT STATEMENT
  public async getLastAccountStatement() {
    try {
      const lastAccountStatement = await AccountStatement.query()
        .orderBy("id", "desc")
        .firstOrFail();
      return lastAccountStatement.serialize() as IAccountStatement;
    } catch (err) {
      const message =
        "No hay ninguna cuenta de cobro creada para crear un consecutivo";
      Logger.error(err, message);
      throw new Error(message);
    }
  }
  // GET AN ACCOUNT STATEMENT BY ACCOUNT NUMBER
  public async getAccountStatementByAccountNumber(payload: IAccountStatement) {
    return await AccountStatement.findBy("accountNum", payload.accountNum);
  }
  // GET AN ACCOUNT STATEMENT BY ACCOUNT NUMBER
  public async getAccountStatementByAccountNum(accountNum: number) {
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("tracking", (trackingQuery) => {
      trackingQuery.preload("status");
    });
    accountStatementQuery.preload("contract", (contractQuery) => {
      contractQuery.preload("business");
    });
    accountStatementQuery.where("accountNum", accountNum);
    const accountStatementFound = await accountStatementQuery.first();
    if (!accountStatementFound) {
      throw new Error(`No se generaron resultados con la búsqueda`);
    }
    return accountStatementFound as IAccountStatement;
  }
}
