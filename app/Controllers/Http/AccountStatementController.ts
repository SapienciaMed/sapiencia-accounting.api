import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AccountStatementProvider from '@ioc:core.AccountStatementProvider';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { accountStatementSchema } from 'App/Validators/AccountStatementValidator/accountStatementSchema';
import { getFilteredAccountStatementSchema } from 'App/Validators/AccountStatementValidator/getFilteredAccountStatementSchema';

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
  // OBTENER CUENTAS DE COBRO
  public async getFiltered({ request, response }: HttpContextContract) {
    let payload: any
    try {
      payload = await request.validate({ schema: getFilteredAccountStatementSchema })
    }catch(err) {
      return new ApiResponse(null, EResponseCodes.FAIL, JSON.stringify(err?.messages?.errors));
    }
    try {
      const filters = request.qs()
      const accountStatements = await AccountStatementProvider.getFiltered(filters)
      return response.send(accountStatements)
    } catch (err) {
      console.log(err);
    }
  }
}
