import { DateTime } from "luxon";

export type IAccountStatementTracking = {
  id: number;
  observation: string;
  trackingDate: DateTime;
  statusId: number;
  accountStatementId: number;
};

export type IAccountStatementTrackingPayload = Pick<
  IAccountStatementTracking,
  "observation" | "statusId"
>;
