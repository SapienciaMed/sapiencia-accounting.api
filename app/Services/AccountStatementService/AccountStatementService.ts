import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IAccountStatementSchema,
  IGetAccountStatement,
  IGetAccountStatementPaginated,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import {
  IAccountStatementCausationReportFilters,
  IAccountStatementPaymentReportFilters,
} from "App/Interfaces/AccountStatementReports";
import AccountStatementRepository from "App/Repositories/AccountStatementRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { createPDFTemplate } from "App/Utils/PDFTemplate";
import { generateXLSX } from "App/Utils/generateXLSX";
import { accountStatementDesktopTemplate } from "../../../storage/templates/accountStatementDesktopTemplate";
import GenericMasterExternalService from "../external/GenericExternalService";
import {
  accountStatementXLSXColumns,
  accountStatementXLSXFilePath,
  accountStatementXLSXRows,
} from "./XLSX";
import {
  causationXLSXColumns,
  causationXLSXFilePath,
  causationXLSXRows,
} from "./causationXLSX";

export interface IAccountStatementService {
  createAccountStatement(
    payload: IAccountStatementSchema
  ): Promise<ApiResponse<IAccountStatement>>;
  getAccountStatementFiltered(
    filters: IGetAccountStatement
  ): Promise<ApiResponse<IPagingData<IGetAccountStatementPaginated>>>;
  getAccountStatementById(
    id: number
  ): Promise<ApiResponse<IGetAccountStatementPaginated>>;
  getLastAccountStatement(): Promise<ApiResponse<IAccountStatement>>;
  updateAccountStatement(
    id: number,
    payload: IUpdateAccountStatement
  ): Promise<ApiResponse<IAccountStatement>>;
  getAccountStatementByAccountNum(
    accountNum: number
  ): Promise<ApiResponse<IAccountStatement>>;
  generateAccountStatementPDF(id: number): Promise<ApiResponse<string>>;
  generateXLSXAccountStatement(
    filters: IGetAccountStatement
  ): Promise<ApiResponse<string>>;
  generateAccountStatementCausationReport(
    filters: IAccountStatementCausationReportFilters
  ): Promise<ApiResponse<IPagingData<IGetAccountStatementPaginated>>>;
  generateAccountStatementCausationReportXLSX(
    filters: IAccountStatementCausationReportFilters
  ): Promise<ApiResponse<string>>;
  generateAccountStatementPaymentReport(
    filters: IAccountStatementPaymentReportFilters
  ): Promise<ApiResponse<IPagingData<IGetAccountStatementPaginated>>>;
}

export default class AccountStatementService
  implements IAccountStatementService
{
  constructor(
    private accountStatementRepository: AccountStatementRepository,
    private genericMasterExternalService: GenericMasterExternalService
  ) {}
  // CREATE ACCOUNT STATEMENT
  public async createAccountStatement(payload: IAccountStatementSchema) {
    // CHECK IF EXISTS ANOTHER ACCOUNT STATEMENT WITH SAME ACCOUNT NUMBER
    const existsAccountStatementId =
      await this.accountStatementRepository.getAccountStatementByAccountNumber(
        payload.accountNum
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
  public async getAccountStatementByAccountNum(accountNum: number) {
    const accountStatementFound =
      await this.accountStatementRepository.getAccountStatementByAccountNum(
        accountNum
      );
    return new ApiResponse(accountStatementFound, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT PDF
  public async generateAccountStatementPDF(id: number) {
    const accountStatementFound =
      await this.accountStatementRepository.getAccountStatementById(id);
    const municipalityName =
      await this.genericMasterExternalService.getMunicipalityNameByItemCode(
        accountStatementFound.contract.business.municipalityCode
      );
    const accountStatementFoundMutated = {
      ...accountStatementFound,
      municipality: municipalityName.itemDescription,
    };
    const dimension = {
      top: "24px",
      right: "50px",
      bottom: "100px",
      left: "50px",
    };
    const PDF_PATH = await createPDFTemplate(
      accountStatementDesktopTemplate(accountStatementFoundMutated),
      dimension,
      "A4"
    );
    return new ApiResponse(PDF_PATH, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT XLSX
  public async generateXLSXAccountStatement(filters: IGetAccountStatement) {
    const accountStatementsFound =
      await this.accountStatementRepository.getAccountStatementFiltered(
        filters
      );
    await generateXLSX({
      columns: accountStatementXLSXColumns,
      data: accountStatementXLSXRows(accountStatementsFound),
      filePath: accountStatementXLSXFilePath,
      worksheetName: "Cuentas de cobro",
    });
    return new ApiResponse(accountStatementXLSXFilePath, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT CAUSATION REPORT
  public async generateAccountStatementCausationReport(
    filters: IAccountStatementCausationReportFilters
  ) {
    const accountStatementsFound =
      await this.accountStatementRepository.generateAccountStatementCausationReport(
        filters
      );
    return new ApiResponse(accountStatementsFound, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT CAUSATION REPORT XLSX
  public async generateAccountStatementCausationReportXLSX(
    filters: IAccountStatementCausationReportFilters
  ) {
    const accountStatementsFound =
      await this.accountStatementRepository.generateAccountStatementCausationReport(
        filters
      );
    await generateXLSX({
      columns: causationXLSXColumns,
      data: causationXLSXRows(accountStatementsFound),
      filePath: causationXLSXFilePath,
      worksheetName: "Cuentas de cobro",
    });
    return new ApiResponse(causationXLSXFilePath, EResponseCodes.OK);
  }
  // GENERATE ACCOUNT STATEMENT PAYMENT REPORT
  public async generateAccountStatementPaymentReport(
    filters: IAccountStatementPaymentReportFilters
  ) {
    const accountStatementsFound =
      await this.accountStatementRepository.generateAccountStatementPaymentReport(
        filters
      );
    return new ApiResponse(accountStatementsFound, EResponseCodes.OK);
  }
}
