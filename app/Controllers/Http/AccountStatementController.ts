import { HttpContext } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementSchema } from "App/Validators/AccountStatementValidator/accountStatementSchema";
import { accountStatementUpdateSchema } from "App/Validators/AccountStatementValidator/accountStatementUpdateSchema";
import { getAccountStatementFilteredSchema } from "App/Validators/AccountStatementValidator/getAccountStatementFilteredSchema";

export default class AccountStatementController {
  // CREATE AN ACCOUNT STATEMENT
  public async createAccountStatement(ctx: HttpContextContract) {
    const { request, response } = ctx;
    let payload: IAccountStatement;
    try {
      payload = await request.validate({ schema: accountStatementSchema });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      console.log(validationErrors);
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
      console.log(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL FILTERED ACCOUNT STATEMENTS
  public async getAccountStatementFiltered(ctx: HttpContextContract) {
    const { request, response } = ctx;
    let filters: IGetAccountStatement;
    try {
      filters = await request.validate({
        schema: getAccountStatementFilteredSchema,
      });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      console.log(validationErrors);
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
      console.log(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE AN ACCOUNT STATEMENT
  public async updateAccountStatement({ request, response }: HttpContext) {
    let payload: IUpdateAccountStatement;
    try {
      payload = await request.validate({
        schema: accountStatementUpdateSchema,
      });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
      console.log(validationErrors);
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
      console.log(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET AN ACCOUNT STATEMENT BY ID
  public async getAccountStatementById({ request, response }: HttpContext) {
    try {
      const { id } = request.params();
      const accountStatementFound =
        await AccountStatementProvider.getAccountStatementById(id);
      return response.ok(accountStatementFound);
    } catch (err) {
      console.log(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET LAST ACCOUNT STATEMENT ID
  public async getLastAccountStatement({ response }: HttpContext) {
    try {
      const lastAccountStatementId =
        await AccountStatementProvider.getLastAccountStatement();
      return response.ok(lastAccountStatementId);
    } catch (err) {
      console.log(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
