import { DateTime } from "luxon";
import { IAccountStatementStatus } from "./AccountStatementStatus";

export type IAccountStatementTracking = {
  id: number;
  observation: string;
  trackingDate: DateTime;
  statusId: number;
  accountStatementId: number;
  status: IAccountStatementStatus;
};

export type IAccountStatementTrackingPayload = Pick<
  IAccountStatementTracking,
  "observation" | "statusId"
>;
