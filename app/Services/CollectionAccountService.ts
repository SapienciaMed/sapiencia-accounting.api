import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ICollectionAccounts,
  // IGetCollectionAccountsList,
  // IFilterCollectionAccounts,
} from "App/Interfaces/CollectionAccountInterface";

// import { IContract } from "App/Interfaces/ContractInterface";

import { ICollectionAccountRepository } from "App/Repositories/CollectionAccountRepository";
// import { IIncapacityTypesRepository } from "App/Repositories/IncapacityTypesRepository";

import { ApiResponse, /*IPagingData*/ } from "App/Utils/ApiResponses";

export interface ICollectionAccountService {

  createCollectionAccounts(incapacity: ICollectionAccounts): Promise<ApiResponse<ICollectionAccounts>>;

}


export default class CollectionAccountService implements ICollectionAccountService {

  constructor(
    private collectionAccountRepository: ICollectionAccountRepository,
  ) { }

  //?Crear una cuenta de cobro
  async createCollectionAccounts(collectionAccount: ICollectionAccounts): Promise<ApiResponse<ICollectionAccounts>>{

    const res = await this.collectionAccountRepository.createCollectionAccounts(collectionAccount);

    if (!res) {

      return new ApiResponse({} as ICollectionAccounts, EResponseCodes.FAIL, "Ocurrió un error en su Transacción");

    }

    return new ApiResponse(res, EResponseCodes.OK);

  }

}
