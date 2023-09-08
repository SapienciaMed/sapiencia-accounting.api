import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IAccountStatementDownloadPDF,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import AccountStatementRepository from "App/Repositories/AccountStatementRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { createPDFTemplate } from "App/Utils/PDFTemplate";
import { accountStatementDesktopTemplate } from "../../storage/templates/accountStatementDesktopTemplate";
import { accountStatementMobileTemplate } from "../../storage/templates/accountStatementMobileTemplate";

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
  getAccountStatementByAccountNum(
    accountNum: number
  ): Promise<ApiResponse<IAccountStatement>>;
  generateAccountStatementPDF(
    id: number,
    filters: IAccountStatementDownloadPDF
  ): Promise<ApiResponse<string>>;
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
    const accountStatements =
      await this.accountStatementRepository.getAccountStatementFiltered(
        filters
      );
    return new ApiResponse(accountStatements, EResponseCodes.OK);
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
  // GET ACCOUNT STATEMENT BY ACCOUNT NUM
  public async getAccountStatementByAccountNum(
    accountNum: number
  ): Promise<ApiResponse<IAccountStatement>> {
    const accountStatementFound =
      await this.accountStatementRepository.getAccountStatementByAccountNum(
        accountNum
      );
    return new ApiResponse(accountStatementFound, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT PDF
  public async generateAccountStatementPDF(
    id: number,
    filters: IAccountStatementDownloadPDF
  ) {
    console.log({ id });
    const { responsive } = filters;
    let PDF_PATH: string;
    if (!responsive) {
      const dimension = {
        top: "24px",
        right: "50px",
        bottom: "100px",
        left: "16px",
      };
      PDF_PATH = await createPDFTemplate(
        accountStatementDesktopTemplate(),
        dimension,
        "A4"
      );
    } else {
      const dimension = {
        top: "16px",
        right: "50px",
        bottom: "100px",
        left: "50px",
      };
      PDF_PATH = await createPDFTemplate(
        accountStatementMobileTemplate(),
        dimension,
        "A5"
      );
    }
    return new ApiResponse(PDF_PATH, EResponseCodes.OK);
  }
}
