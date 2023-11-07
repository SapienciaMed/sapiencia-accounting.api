import {
  IAccountStatementTracking,
  IAccountStatementTrackingPayload,
} from "App/Interfaces/AccountStatementTracking";
import AccountStatementTracking from "App/Models/AccountStatementTracking";

export interface IAccountStatementTrackingRepository {
  updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ): Promise<IAccountStatementTracking>;
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
}
