import {
  IAccountStatement,
  IAccountStatementFilters,
} from "App/Interfaces/AccountStatement";
import AccountStatement from "App/Models/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementRepository {
  create(payload: IAccountStatement): Promise<IAccountStatement>;
  getAccountStatementFiltered(
    filters: IAccountStatementFilters
  ): Promise<IPagingData<IAccountStatement>>;
}

export default class AccountStatementRepository
  implements IAccountStatementRepository
{
  async create(payload: IAccountStatement): Promise<IAccountStatement> {
    const newAccountStatement = new AccountStatement();
    await newAccountStatement.fill({ ...payload }).save();
    return newAccountStatement.serialize() as IAccountStatement;
  }
  async getAccountStatementFiltered(
    filters: IAccountStatementFilters
  ): Promise<IPagingData<IAccountStatement>> {
    const { accountNum, contractCode, expirationDate, nit, page, perPage } =
      filters;
    const query = AccountStatement.query().preload("contract", (q) =>
      q.preload("socialReason")
    );
    if (accountNum) {
      query.where("accountNum", accountNum);
    }

    if (contractCode) {
      query.where("contractCode", contractCode);
    }

    if (nit) {
      query.whereHas("contract", (sub1query) => {
        sub1query.whereHas("socialReason", (sub2query) =>
          sub2query.where("nit", nit)
        );
      });
    }
    if (expirationDate) {
      query.where("expirationDate", expirationDate.toString());
    }

    const res = await query.paginate(page, perPage);
    const { data, meta } = res.serialize();
    return {
      array: data as IAccountStatement[],
      meta,
    };
  }
}
