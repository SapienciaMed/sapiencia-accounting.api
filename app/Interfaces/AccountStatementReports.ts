import { DateTime } from "luxon";

export type IAccountStatementCausationReportFilters = {
  expeditionDateFrom: DateTime;
  expeditionDateUntil: DateTime;
  page: number;
  perPage: number;
};

export type IAccountStatementPaymentReportFilters = {
  paymentDateFrom: DateTime;
  paymentDateUntil: DateTime;
  page: number;
  perPage: number;
};

export type IAccountStatementDefeatedPorfolioReportFilters = {
  statusId: number;
  page: number;
  perPage: number;
};
