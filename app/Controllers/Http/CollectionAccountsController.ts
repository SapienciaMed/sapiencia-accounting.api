import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CollectionAccountProvider    from "@ioc:core.CollectionAccountProvider";

import { EResponseCodes }            from "App/Constants/ResponseCodesEnum";
import { ApiResponse }               from "App/Utils/ApiResponses";
import { ICollectionAccounts }       from 'App/Interfaces/CollectionAccountInterface';
import { IFilterCollectionAccounts } from 'App/Interfaces/CollectionAccountInterface';

// TODO: Revisar por qué no me está funcionando el Validator
// import CreateAndUpdateCollectionAccountsValidator from 'App/Validators/CreateAndUpdateCollectionAccountsValidator';


export default class CollectionAccountsController {

  //?Obtener todas las cuentas de cobro - Resultado Relacional - Paginado
  public async getCollectionAccounts({ response, request }: HttpContextContract) {

    try {

      const data = request.body() as IFilterCollectionAccounts;
      return response.send(
        await CollectionAccountProvider.getCollectionAccountsPaginate(data)
      );

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

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
  public async updateCollectionAccounts({ request, response }: HttpContextContract) {

    try {

      // TODO: Revisar por qué no me está funcionando el Validator
      // const incapacityValidate = (await request.validate(CreateAndUpdateIncapacityValidator)) as IIncapacity;
      const collectionAccount = request.body() as ICollectionAccounts
      const { id } = collectionAccount;

      return response.send(await CollectionAccountProvider.updateCollectionAccounts(collectionAccount, Number(id)));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  //?Eliminar una cuenta de cobro
  public async deleteCollectionAccounts({ request, response }: HttpContextContract) {

    try {

      const { id } = request.params();
      return response.send(await CollectionAccountProvider.deleteCollectionAccounts( Number(id) ));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  //?Obtener una cuenta de cobro por su ID - Resultado Relacional
  public async getByIdCollectionAccounts({ request, response }: HttpContextContract) {

    try {

      const { id } = request.params();
      return response.send(await CollectionAccountProvider.getByIdCollectionAccounts(id));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }

  }


}
