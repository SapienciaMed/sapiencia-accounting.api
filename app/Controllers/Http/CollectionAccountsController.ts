import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ICollectionAccounts } from 'App/Interfaces/CollectionAccountInterface';
import CollectionAccountProvider from "@ioc:core.CollectionAccountProvider";

// TODO: Revisar por qué no me está funcionando el Validator
// import CreateAndUpdateCollectionAccountsValidator from 'App/Validators/CreateAndUpdateCollectionAccountsValidator';


export default class CollectionAccountsController {

  //?Obtener todas las cuentas de cobro - Resultado Relacional - Paginado
  // public async getCollectionAccounts({ response }: HttpContextContract) {

  // }

  //?Crear una cuenta de cobro
  public async createCollectionAccounts({ request, response }: HttpContextContract) {

    try {

      const collectionAccount = request.body() as ICollectionAccounts;

      return response.send(
        await CollectionAccountProvider.createCollectionAccounts(collectionAccount)
      );


      // TODO: Revisar por qué no me está funcionando el Validator
      // const collectionAccountValidate = (await request.validate(CreateAndUpdateCollectionAccountsValidator)) as ICollectionAccounts;
      // console.log(collectionAccountValidate);
      // return response.send(
      //   await CollectionAccountProvider.createCollectionAccounts(collectionAccountValidate)
      // );

    } catch (err) {

      return new ApiResponse(null, EResponseCodes.FAIL, String(err.messages));

    }

  }

  //?Actualizar una cuenta de cobro
  // public async updateCollectionAccounts({ request, response }: HttpContextContract) {

  // }

  //?Eliminar una cuenta de cobro
  // public async deleteCollectionAccounts({ request, response }: HttpContextContract) {

  // }

  //?Obtener una cuenta de cobro por su ID - Resultado Relacional
  // public async getByIdCollectionAccounts({ request, response }: HttpContextContract) {

  // }


}
