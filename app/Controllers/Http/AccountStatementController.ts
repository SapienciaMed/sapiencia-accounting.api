import { HttpContext } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IAccountStatementDownloadPDF,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
<<<<<<< Updated upstream
=======
import { accountStatementDownloadPDFSchema } from "App/Validators/AccountStatementValidator/accountStatementDownloadPDFSchema";
>>>>>>> Stashed changes
import { accountStatementSchema } from "App/Validators/AccountStatementValidator/accountStatementSchema";
import { accountStatementUpdateSchema } from "App/Validators/AccountStatementValidator/accountStatementUpdateSchema";
import { getAccountStatementFilteredSchema } from "App/Validators/AccountStatementValidator/getAccountStatementFilteredSchema";

export default class AccountStatementController {
  // CREATE AN ACCOUNT STATEMENT
  public async createAccountStatement(ctx: HttpContextContract) {
<<<<<<< Updated upstream
    const { request, response } = ctx;
=======
    const { request, response, logger } = ctx;
>>>>>>> Stashed changes
    let payload: IAccountStatement;
    try {
      payload = await request.validate({ schema: accountStatementSchema });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
<<<<<<< Updated upstream
      console.log(validationErrors);
=======
      logger.error(validationErrors);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const { request, response } = ctx;
=======
    const { request, response, logger } = ctx;
>>>>>>> Stashed changes
    let filters: IGetAccountStatement;
    try {
      filters = await request.validate({
        schema: getAccountStatementFilteredSchema,
      });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
<<<<<<< Updated upstream
=======
      logger.error(validationErrors);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  public async updateAccountStatement({ request, response }: HttpContext) {
=======
  public async updateAccountStatement(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
>>>>>>> Stashed changes
    let payload: IUpdateAccountStatement;
    try {
      payload = await request.validate({
        schema: accountStatementUpdateSchema,
      });
    } catch (err) {
      const validationErrors = err?.messages?.errors;
<<<<<<< Updated upstream
      console.log(validationErrors);
=======
      logger.error(validationErrors);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  public async getAccountStatementById({ request, response }: HttpContext) {
=======
  public async getAccountStatementById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  public async getLastAccountStatement({ response }: HttpContext) {
=======
  public async getLastAccountStatement(ctx: HttpContextContract) {
    const { response, logger } = ctx;
>>>>>>> Stashed changes
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
  // GENERATE ACCOUNT STATEMENT PDF
<<<<<<< Updated upstream
  public async generateAccountStatementPDF({ response }: HttpContext) {
    const puppeteer = require("puppeteer");
    const fs = require("fs");

    (async () => {
      // Create a browser instance
      const browser = await puppeteer.launch();

      // Create a new page
      const page = await browser.newPage();

      //Get HTML content from HTML file
      const html = fs.readFileSync(
        "./storage/templates/referralDocument/index.html",
        "utf-8"
      );
      await page.setContent(html, { waitUntil: "domcontentloaded" });

      // To reflect CSS used for screens instead of print
      await page.emulateMediaType("screen");

      // Downlaod the PDF
      await page.pdf({
        path: "result.pdf",
        margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
        printBackground: true,
        format: "A4",
      });

      // Close the browser instance
      await browser.close();
    })();
    response.noContent();
=======
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
>>>>>>> Stashed changes
  }
}
