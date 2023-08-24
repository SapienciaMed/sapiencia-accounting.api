import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccountStatementProvider from "@ioc:core.AccountStatementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatementFilters } from "App/Interfaces/AccountStatement";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementSchema } from "App/Validators/AccountStatementValidator/accountStatementSchema";

export default class AccountStatementController {
  // CREAR CUENTA DE COBRO
  public async create({ request, response }: HttpContextContract) {
    let payload: any;
    try {
      payload = await request.validate({ schema: accountStatementSchema });
    } catch (err) {
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        JSON.stringify(err?.messages?.errors)
      );
    }
    try {
      const newAccountStatement = await AccountStatementProvider.create(
        payload
      );
      return response.send(newAccountStatement);
    } catch (err) {
      console.log(err);
      return new ApiResponse(null, EResponseCodes.FAIL, err.message);
    }
  }
  // OBTENER CUENTAS DE COBRO
  public async getAccountStatementFiltered({
    request,
    response,
  }: HttpContextContract) {
    // let payload: IAccountStatementFilters;
    // try {
    //   payload = await request.validate({
    //     schema: getFilteredAccountStatementSchema,
    //   });
    // } catch (err) {
    //   return new ApiResponse(
    //     null,
    //     EResponseCodes.FAIL,
    //     JSON.stringify(err?.messages?.errors)
    //   );
    // }
    try {
      const filters = request.qs() as IAccountStatementFilters;
      const accountStatements =
        await AccountStatementProvider.getAccountStatementFiltered(filters);
      return response.send(accountStatements);
    } catch (err) {
      console.log(err);
      return new ApiResponse(null, EResponseCodes.FAIL, err.message);
    }
  }
  // ACTUALIZAR CUENTA DE COBRO
  public async update() {
    try {
      console.log("--");
    } catch (err) {
      console.log(err);
    }
  }
}
