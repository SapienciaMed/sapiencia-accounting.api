import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatementPaymentReportFilters } from "App/Interfaces/AccountStatementReports";
import {
  IAccountStatementTracking,
  IAccountStatementTrackingPayload,
} from "App/Interfaces/AccountStatementTracking";
import { IAccountStatementTrackingRepository } from "App/Repositories/AccountStatementTrackingRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementTrackingService {
  updateOrCreateAccountStatementTracking(
    accountStatementId: number,
    payload: IAccountStatementTrackingPayload
  ): Promise<ApiResponse<IAccountStatementTracking>>;
  getAccountStatementTrackingByDate(
    filters: IAccountStatementPaymentReportFilters
  ): Promise<IPagingData<IAccountStatementTracking>>;
}

export default class AccountStatementTrackingService
  implements IAccountStatementTrackingService
{
  constructor(
    private accountStatementTrackingRepository: IAccountStatementTrackingRepository
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
  // GET ACCOUNT STATEMENT TRACKING BY DATE
  public async getAccountStatementTrackingByDate(
    filters: IAccountStatementPaymentReportFilters
  ) {
    return await this.accountStatementTrackingRepository.getAccountStatementTrackingByDate(
      filters
    );
  }
}
