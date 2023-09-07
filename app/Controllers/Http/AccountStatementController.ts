import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IAccountStatementDownloadPDF,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementDownloadPDFSchema } from "App/Validators/AccountStatementValidator/accountStatementDownloadPDFSchema";
import { accountStatementSchema } from "App/Validators/AccountStatementValidator/accountStatementSchema";
import { accountStatementUpdateSchema } from "App/Validators/AccountStatementValidator/accountStatementUpdateSchema";
import { getAccountStatementFilteredSchema } from "App/Validators/AccountStatementValidator/getAccountStatementFilteredSchema";

export default class AccountStatementController {
  // CREATE AN ACCOUNT STATEMENT
  public async createAccountStatement(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAccountStatement;
    try {
      payload = await request.validate({ schema: accountStatementSchema });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
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
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
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
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
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
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
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
  // GENERATE REFERRAL PDF
  public async generateReferralPDF(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAccountStatementDownloadPDF;
    try {
      filters = await request.validate({
        schema: accountStatementDownloadPDFSchema,
      });
      response.send(filters);
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      logger.error(validationErrors);
      const apiResp = new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(validationErrors)
      );
      return response.badRequest(apiResp);
    }
    try {
      const { id } = request.params();
      const resp = await AccountStatementProvider.generateReferralPDF(
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
}
