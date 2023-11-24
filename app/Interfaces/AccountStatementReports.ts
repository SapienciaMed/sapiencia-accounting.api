import { DateTime } from "luxon";

export type IAccountStatementCausationReportFilters = {
  expeditionDateFrom: DateTime;
  expeditionDateUntil: DateTime;
  page: number;
  perPage: number;
};
