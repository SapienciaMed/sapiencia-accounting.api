import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatementDownloadPDF,
  IAccountStatementSchema,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { accountStatementDownloadPDFSchema } from "App/Validators/AccountStatement/accountStatementDownloadPDFSchema";
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
    let filters: IAccountStatementDownloadPDF;
    try {
      filters = await request.validate({
        schema: accountStatementDownloadPDFSchema,
      });
      response.send(filters);
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const resp = await AccountStatementProvider.generateAccountStatementPDF(
        id,
        filters
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
}
