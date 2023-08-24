import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AccountStatementProvider from '@ioc:core.AccountStatementProvider';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementSchema } from 'App/Validators/AccountStatementValidator';

export default class AccountStatementController {
  // CREAR CUENTA DE COBRO
  public async create({ request, response }: HttpContextContract) {
    let payload: any
    try {
      payload = await request.validate({ schema: accountStatementSchema })
    } catch (err) {
      return new ApiResponse(null, EResponseCodes.FAIL, JSON.stringify(err?.messages?.errors));
    }
    try {
      const newAccountStatement = await AccountStatementProvider.create(payload)
      return response.send(newAccountStatement)
    } catch (err) {
      console.log(err);
    }
  }
}
