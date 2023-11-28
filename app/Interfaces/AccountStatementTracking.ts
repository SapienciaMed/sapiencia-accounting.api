import AccountStatement from "App/Models/AccountStatement";
import { DateTime } from "luxon";

export type IAccountStatementTracking = {
  id: number;
  observation: string;
  trackingDate: DateTime;
  statusId: number;
  accountStatementId: number;
  accountStatement: AccountStatement;
};

export type IAccountStatementTrackingPayload = Pick<
  IAccountStatementTracking,
  "observation" | "statusId"
>;
