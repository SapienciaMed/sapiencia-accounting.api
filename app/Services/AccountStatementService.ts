import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IGetAccountStatement,
} from "App/Interfaces/AccountStatement";
import AccountStatementRepository from "App/Repositories/AccountStatementRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IAccountStatementService {
  createAccountStatement(
    payload: IAccountStatement
  ): Promise<ApiResponse<IAccountStatement>>;
  getAccountStatementFiltered(
    filters: IGetAccountStatement
  ): Promise<ApiResponse<IPagingData<IAccountStatement>>>;
  getAccountStatementById(id: number): Promise<ApiResponse<IAccountStatement>>;
  getLastAccountStatement(): Promise<ApiResponse<IAccountStatement>>;
}

export default class AccountStatementService
  implements IAccountStatementService
{
  constructor(private accountStatementRepository: AccountStatementRepository) {}
  // CREATE ACCOUNT STATEMENT
  public async createAccountStatement(payload: IAccountStatement) {
    const newAccountStatement =
      await this.accountStatementRepository.createAccountStatement(payload);
    return new ApiResponse(newAccountStatement, EResponseCodes.OK);
  }
  // GET ALL ACCOUNT STATEMENT FILTERED
  public async getAccountStatementFiltered(filters: IGetAccountStatement) {
    const accountsStatements =
      await this.accountStatementRepository.getAccountStatementFiltered(
        filters
      );
    return new ApiResponse(accountsStatements, EResponseCodes.OK);
  }
  // GET AN ACOUNT STATEMENT BY ID
  public async getAccountStatementById(id: number) {
    const accountStatementFound =
      await this.accountStatementRepository.getAccountStatementById(id);
    return new ApiResponse(accountStatementFound, EResponseCodes.OK);
  }
  // GET LAST ACCOUNT STATEMENT
  public async getLastAccountStatement() {
    const lastAccountStatement =
      await this.accountStatementRepository.getLastAccountStatement();
    return new ApiResponse(lastAccountStatement, EResponseCodes.OK);
  }
}
