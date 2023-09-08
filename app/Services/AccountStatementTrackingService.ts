import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatementTracking,
  IAccountStatementTrackingPayload,
} from "App/Interfaces/AccountStatementTracking";
import AccountStatementTrackingRepository from "App/Repositories/AccountStatementTrackingRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IAccountStatementTrackingService {
  updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ): Promise<ApiResponse<IAccountStatementTracking>>;
}

export default class AccountStatementTrackingService
  implements IAccountStatementTrackingService
{
  constructor(
    private accountStatementTrackingRepository: AccountStatementTrackingRepository
  ) {}
  // UPDATE OR CREATE ACCOUNT STATEMENT TRACKING
  async updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ) {
    const accountStatementTracking =
      await this.accountStatementTrackingRepository.updateOrCreateAccountStatementTracking(
        accountStatementId,
        payload
      );
    return new ApiResponse(accountStatementTracking, EResponseCodes.OK);
  }
}
