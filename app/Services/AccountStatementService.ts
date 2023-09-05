import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IGetAccountStatement,
  IUpdateAccountStatement,
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
  updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ): Promise<ApiResponse<IAccountStatement>>;
}

export default class AccountStatementService
  implements IAccountStatementService
{
  constructor(private accountStatementRepository: AccountStatementRepository) {}
  // CREATE ACCOUNT STATEMENT
  public async createAccountStatement(payload: IAccountStatement) {
    // CHECK IF EXISTS ANOTHER ACCOUNT STATEMENT WITH SAME ACCOUNT NUMBER
    const existsAccountStatementId =
      await this.accountStatementRepository.getAccountStatementByAccountNumber(
        payload
      );
    if (existsAccountStatementId) {
      const { accountNum: lastId } =
        await this.accountStatementRepository.getLastAccountStatement();
      payload.accountNum = lastId + 1;
    }
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
  // UPDATE AN ACCOUNT STATEMENT
  public async updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ) {
    const accountStatementUpdated =
      await this.accountStatementRepository.updateAccountStatement(id, payload);
    return new ApiResponse(accountStatementUpdated, EResponseCodes.OK);
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
