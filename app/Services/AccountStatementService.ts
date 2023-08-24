import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IAccountStatementFilters,
} from "App/Interfaces/AccountStatement";
import AccountStatementRepository from "App/Repositories/AccountStatementRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementService {
  create(payload: IAccountStatement): Promise<ApiResponse<IAccountStatement>>;
  getAccountStatementFiltered(
    filters: IAccountStatementFilters
  ): Promise<ApiResponse<IPagingData<IAccountStatement>>>;
}

export default class AccountStatementService
  implements IAccountStatementService
{
  constructor(private accountStatementRepository: AccountStatementRepository) {}
  async create(
    payload: IAccountStatement
  ): Promise<ApiResponse<IAccountStatement>> {
    const newAccountStatement = await this.accountStatementRepository.create(
      payload
    );
    return new ApiResponse(newAccountStatement, EResponseCodes.OK);
  }
  async getAccountStatementFiltered(
    filters: IAccountStatementFilters
  ): Promise<ApiResponse<IPagingData<IAccountStatement>>> {
    const accountsStatements =
      await this.accountStatementRepository.getAccountStatementFiltered(filters);
    return new ApiResponse(accountsStatements, EResponseCodes.OK);
  }
}
