import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatementStatus } from "App/Interfaces/AccountStatementStatus";
import AccountStatementStatusRepository from "App/Repositories/AccountStatementStatusRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IAccountStatementStatusService {
  getAllAccountStatementStatus(): Promise<
    ApiResponse<IAccountStatementStatus[]>
  >;
}

export default class AccountStatementStatusService
  implements IAccountStatementStatusService
{
  constructor(
    private accountStatementStatusRepository: AccountStatementStatusRepository
  ) {}
  // GET ALL ACCOUNT STATEMENT STATUS
  public async getAllAccountStatementStatus() {
    const accountStatementStatuses =
      await this.accountStatementStatusRepository.getAllAccountStatementStatus();
    return new ApiResponse(accountStatementStatuses, EResponseCodes.OK);
  }
}
