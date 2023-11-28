import {
  IAccountStatementDefeatedPorfolioReportFilters,
  IAccountStatementPaymentReportFilters,
} from "App/Interfaces/AccountStatementReports";
import {
  IAccountStatementTracking,
  IAccountStatementTrackingPayload,
} from "App/Interfaces/AccountStatementTracking";
import AccountStatementTracking from "App/Models/AccountStatementTracking";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementTrackingRepository {
  updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ): Promise<IAccountStatementTracking>;
  getAccountStatementTrackingByDate(
    filters: IAccountStatementPaymentReportFilters
  ): Promise<IPagingData<IAccountStatementTracking>>;
  getAccountStatementTrackingByStatus(
    filters: IAccountStatementDefeatedPorfolioReportFilters
  ): Promise<IPagingData<IAccountStatementTracking>>;
}

export default class AccountStatementTrackingRepository
  implements IAccountStatementTrackingRepository
{
  // UPDATE OR CREATE ACCOUNT STATEMENT TRACKING
  public async updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ) {
    return await AccountStatementTracking.updateOrCreate(
      { accountStatementId },
      payload
    );
  }
  // GET ACCOUNT STATEMENTS TRACKING BY DATE
  public async getAccountStatementTrackingByDate(
    filters: IAccountStatementPaymentReportFilters
  ) {
    const { paymentDateFrom, paymentDateUntil, page, perPage } = filters;
    const accountStatementTrackingQuery = AccountStatementTracking.query();
    accountStatementTrackingQuery.preload(
      "accountStatement",
      (accountStatementQuery) => {
        accountStatementQuery.preload("contract", (contractQuery) => {
          contractQuery.preload("business");
        });
      }
    );
    const auxPaymentDateFrom = paymentDateFrom?.toSQL();
    const auxPaymentDateUntil = paymentDateUntil?.toSQL();
    if (auxPaymentDateFrom && auxPaymentDateUntil) {
      accountStatementTrackingQuery.whereBetween("trackingDate", [
        auxPaymentDateFrom,
        auxPaymentDateUntil,
      ]);
    }
    const accountStatementTrackingsFound =
      await accountStatementTrackingQuery.paginate(page, perPage);
    const { meta, data } = accountStatementTrackingsFound.serialize();
    return {
      meta,
      array: data as IAccountStatementTracking[],
    };
  }
  // GET ACCOUNT STATEMENTS TRACKING BY DATE
  public async getAccountStatementTrackingByStatus(
    filters: IAccountStatementDefeatedPorfolioReportFilters
  ) {
    const { statusId, page, perPage } = filters;
    const accountStatementTrackingQuery = AccountStatementTracking.query();
    accountStatementTrackingQuery.preload(
      "accountStatement",
      (accountStatementQuery) => {
        accountStatementQuery.preload("contract", (contractQuery) => {
          contractQuery.preload("business");
        });
      }
    );
    accountStatementTrackingQuery.where("statusId", statusId);
    const accountStatementTrackingsFound =
      await accountStatementTrackingQuery.paginate(page, perPage);
    const { meta, data } = accountStatementTrackingsFound.serialize();
    return {
      meta,
      array: data as IAccountStatementTracking[],
    };
  }
}
