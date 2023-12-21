import Env from "@ioc:Adonis/Core/Env";
import Logger from "@ioc:Adonis/Core/Logger";
import {
  IAccountStatement,
  IAccountStatementSchema,
  IGetAccountStatement,
  IGetAccountStatementPaginated,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { IAccountStatementCausationReportFilters } from "App/Interfaces/AccountStatementReports";
import AccountStatement from "App/Models/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementRepository {
  createAccountStatement(
    payload: IAccountStatementSchema
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
  generateAccountStatementCausationReport(
    filters: IAccountStatementCausationReportFilters
  ): Promise<IPagingData<IGetAccountStatementPaginated>>;
}

export default class AccountStatementRepository
  implements IAccountStatementRepository
{
  // CREATE ACCOUNT STATEMENT
  public async createAccountStatement(payload: IAccountStatementSchema) {
    const newAccountStatement = new AccountStatement();
    await newAccountStatement
      .fill({
        ...payload,
        userCreate: Env.get("CURRENT_USER_DOCUMENT"),
      })
      .save();
    return newAccountStatement.serialize() as IAccountStatement;
  }
  // GET ALL ACCOUNT STATEMENT FILTERED
  public async getAccountStatementFiltered(filters: IGetAccountStatement) {
    const { accountNum, contractCode, expeditionDate, nit, page, perPage } =
      filters;
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("tracking");
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
      const startDate = expeditionDate
        .startOf("day")
        .toFormat("yyyy-MM-dd HH:mm:ss");
      const endDate = expeditionDate
        .endOf("day")
        .toFormat("yyyy-MM-dd HH:mm:ss");
      accountStatementQuery.whereBetween("expeditionDate", [
        startDate,
        endDate,
      ]);
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
    const resp = await accountStatementFound
      .merge({
        ...payload,
        userModified: Env.get("CURRENT_USER_DOCUMENT"),
      })
      .save();
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
  public async getAccountStatementByAccountNumber(accountNum: number) {
    return await AccountStatement.findBy("accountNum", accountNum);
  }
  // GET AN ACCOUNT STATEMENT BY ACCOUNT NUMBER
  public async getAccountStatementByAccountNum(accountNum: number) {
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("tracking");
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
  // GENERATE ACCOUNT STATEMENT CAUSATION REPORT
  public async generateAccountStatementCausationReport(
    filters: IAccountStatementCausationReportFilters
  ) {
    const accountStatementQuery = AccountStatement.query();
    accountStatementQuery.preload("contract", (contractQuery) => {
      contractQuery.preload("business");
    });
    const { expeditionDateFrom, expeditionDateUntil, page, perPage } = filters;
    const auxExpeditionDateFrom = expeditionDateFrom?.toSQL();
    const auxExpeditionDateUntil = expeditionDateUntil?.toSQL();
    if (auxExpeditionDateFrom && auxExpeditionDateUntil) {
      accountStatementQuery.whereBetween("expeditionDate", [
        auxExpeditionDateFrom,
        auxExpeditionDateUntil,
      ]);
    }
    const accountStatementsFound = await accountStatementQuery.paginate(
      page,
      perPage
    );
    const { meta, data } = accountStatementsFound.serialize();
    return { meta, array: data as IGetAccountStatementPaginated[] };
  }
}
