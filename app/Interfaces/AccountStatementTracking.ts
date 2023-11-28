import { DateTime } from "luxon";
import { IAccountStatement } from "./AccountStatement";

export type IAccountStatementTracking = {
  id: number;
  observation: string;
  trackingDate: DateTime;
  statusId: number;
  accountStatementId: number;
  accountStatement: IAccountStatement;
};

export type IAccountStatementTrackingPayload = Pick<
  IAccountStatementTracking,
  "observation" | "statusId"
>;
