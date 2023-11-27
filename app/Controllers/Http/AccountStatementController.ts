import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatementSchema,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import {
  IAccountStatementCausationReportFilters,
  IAccountStatementDefeatedPorfolioReportFilters,
  IAccountStatementPaymentReportFilters,
} from "App/Interfaces/AccountStatementReports";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import {
  accountStatementCausationReportSchema,
  accountStatementDefeatedPortfolioReportSchema,
  accountStatementPaymentReportSchema,
} from "App/Validators/AccountStatement/accountStatementReportSchema";
import { accountStatementSchema } from "App/Validators/AccountStatement/accountStatementSchema";
import { accountStatementUpdateSchema } from "App/Validators/AccountStatement/accountStatementUpdateSchema";
import { getAccountStatementFilteredSchema } from "App/Validators/AccountStatement/getAccountStatementFilteredSchema";

export default class AccountStatementController {
  // CREATE AN ACCOUNT STATEMENT
  public async createAccountStatement(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAccountStatementSchema;
    try {
      payload = await request.validate({ schema: accountStatementSchema });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAccountStatement =
        await AccountStatementProvider.createAccountStatement(payload);
      return response.created(newAccountStatement);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL FILTERED ACCOUNT STATEMENTS
  public async getAccountStatementFiltered(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IGetAccountStatement;
    try {
      filters = await request.validate({
        schema: getAccountStatementFilteredSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const accountStatements =
        await AccountStatementProvider.getAccountStatementFiltered(filters);
      return response.ok(accountStatements);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE AN ACCOUNT STATEMENT
  public async updateAccountStatement(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IUpdateAccountStatement;
    try {
      payload = await request.validate({
        schema: accountStatementUpdateSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const newAccountStatement =
        await AccountStatementProvider.updateAccountStatement(id, payload);
      return response.ok(newAccountStatement);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET AN ACCOUNT STATEMENT BY ID
  public async getAccountStatementById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const accountStatementFound =
        await AccountStatementProvider.getAccountStatementById(id);
      return response.ok(accountStatementFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET LAST ACCOUNT STATEMENT ID
  public async getLastAccountStatement(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const lastAccountStatementId =
        await AccountStatementProvider.getLastAccountStatement();
      return response.ok(lastAccountStatementId);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET AN ACCOUNT STATEMENT BY ACCOUNT NUMBER
  public async getAccountStatementByAccountNum(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { accountNum } = request.params();
      const accountStatementFound =
        await AccountStatementProvider.getAccountStatementByAccountNum(
          accountNum
        );
      return response.ok(accountStatementFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ACCOUNT STATEMENT PDF
  public async generateAccountStatementPDF(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const resp = await AccountStatementProvider.generateAccountStatementPDF(
        id
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE XLSX
  public async generateXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IGetAccountStatement;
    try {
      filters = await request.validate({
        schema: getAccountStatementFilteredSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await AccountStatementProvider.generateXLSXAccountStatement(
        filters
      );
      response.header(
        "Content-Disposition",
        "attachment; filename=cuentas_cobro.xlsx"
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ACCOUNT STATEMENT CAUSATION REPORT
  public async generateAccountStatementCausationReport(
    ctx: HttpContextContract
  ) {
    const { request, response, logger } = ctx;
    let filters: IAccountStatementCausationReportFilters;
    try {
      filters = await request.validate({
        schema: accountStatementCausationReportSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const accountStatementsFound =
        await AccountStatementProvider.generateAccountStatementCausationReport(
          filters
        );
      return response.ok(accountStatementsFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ACCOUNT STATEMENT CAUSATION REPORT XLSX
  public async generateAccountStatementCausationReportXLSX(
    ctx: HttpContextContract
  ) {
    const { request, response, logger } = ctx;
    let filters: IAccountStatementCausationReportFilters;
    try {
      filters = await request.validate({
        schema: accountStatementCausationReportSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp =
        await AccountStatementProvider.generateAccountStatementCausationReportXLSX(
          filters
        );
      response.header(
        "Content-Disposition",
        "attachment; filename=informe_causacion.xlsx"
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ACCOUNT STATEMENT PAYMENT REPORT
  public async generateAccountStatementPaymentReport(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAccountStatementPaymentReportFilters;
    try {
      filters = await request.validate({
        schema: accountStatementPaymentReportSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const accountStatementsFound =
        await AccountStatementProvider.generateAccountStatementPaymentReport(
          filters
        );
      return response.ok(accountStatementsFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ACCOUNT STATEMENT DEFEATED PORTFOLIO REPORT
  public async generateAccountStatementDefeatedPortfolioReport(
    ctx: HttpContextContract
  ) {
    const { request, response, logger } = ctx;
    let filters: IAccountStatementDefeatedPorfolioReportFilters;
    try {
      filters = await request.validate({
        schema: accountStatementDefeatedPortfolioReportSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const accountStatementsFound =
        await AccountStatementProvider.generateAccountStatementDefeatedPortfolioReport(
          filters
        );
      return response.ok(accountStatementsFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
