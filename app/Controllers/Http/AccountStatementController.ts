import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAccountStatement,
  IGetAccountStatement,
  IUpdateAccountStatement,
} from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
import { validateSchema } from "App/Utils/validateSchema";
import { accountStatementSchema } from "App/Validators/AccountStatementValidator/accountStatementSchema";
import { accountStatementUpdateSchema } from "App/Validators/AccountStatementValidator/accountStatementUpdateSchema";
import { getAccountStatementFilteredSchema } from "App/Validators/AccountStatementValidator/getAccountStatementFilteredSchema";

export default class AccountStatementController {
  // CREATE AN ACCOUNT STATEMENT
  public async createAccountStatement(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    const payload = (await validateSchema(
      ctx,
      accountStatementSchema
    )) as IAccountStatement;
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
    const { response } = ctx;
    const filters = (await validateSchema(
      ctx,
      getAccountStatementFilteredSchema
    )) as IGetAccountStatement;
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
  public async updateAccountStatement(ctx: HttpContextContract) {
    const { request, response } = ctx;
    const payload = (await validateSchema(
      ctx,
      accountStatementUpdateSchema
    )) as IUpdateAccountStatement;
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
  public async getAccountStatementById({
    request,
    response,
  }: HttpContextContract) {
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
  public async getLastAccountStatement({ response }: HttpContextContract) {
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
  // GENERATE ACCOUNT STATEMENT PDF
  public async generateAccountStatementPDF({ response }: HttpContextContract) {
    // const puppeteer = require("puppeteer");
    // const fs = require("fs");

    // (async () => {
    //   // Create a browser instance
    //   const browser = await puppeteer.launch();

    //   // Create a new page
    //   const page = await browser.newPage();

    //   //Get HTML content from HTML file
    //   const html = fs.readFileSync(
    //     "./storage/templates/referralDocument/index.html",
    //     "utf-8"
    //   );
    //   await page.setContent(html, { waitUntil: "domcontentloaded" });

    //   // To reflect CSS used for screens instead of print
    //   await page.emulateMediaType("screen");

    // Downlaod the PDF
    // await page.pdf({
    //   path: "result.pdf",
    //   margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    //   printBackground: true,
    //   format: "A4",
    // });

    //   // Close the browser instance
    //   await browser.close();
    // })();
    response.noContent();
  }
}
