import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ICollectionAccounts,
  IGetCollectionAccountsList,
  IFilterCollectionAccounts,
} from "App/Interfaces/CollectionAccountInterface";

// import { IContract } from "App/Interfaces/ContractInterface";

import { ICollectionAccountRepository } from "App/Repositories/CollectionAccountRepository";
// import { IIncapacityTypesRepository } from "App/Repositories/IncapacityTypesRepository";

import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface ICollectionAccountService {

  createCollectionAccounts(incapacity: ICollectionAccounts): Promise<ApiResponse<ICollectionAccounts>>;
  getCollectionAccountsPaginate(filters: IFilterCollectionAccounts): Promise<ApiResponse<IPagingData<IGetCollectionAccountsList>>>;
  getByIdCollectionAccounts(id: number): Promise<ApiResponse<IGetCollectionAccountsList>>;
  updateCollectionAccounts(collectionAccount: ICollectionAccounts, id: number): Promise<ApiResponse<ICollectionAccounts | null>>;
  deleteCollectionAccounts(id: number): Promise<ApiResponse<boolean>>;

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

  //?Listar cuentas de cobros
  async getCollectionAccountsPaginate(filters: IFilterCollectionAccounts): Promise<ApiResponse<IPagingData<IGetCollectionAccountsList>>>{

    const collectionAccounts = await this.collectionAccountRepository.getCollectionAccountsPaginate(filters);
    return new ApiResponse(collectionAccounts, EResponseCodes.OK);

  }

  //?Obtener cuenta de cobro por ID - El ID viene como parámetro
  async getByIdCollectionAccounts(id: number): Promise<ApiResponse<IGetCollectionAccountsList>>{

    const collectionAccount = await this.collectionAccountRepository.getByIdCollectionAccounts(id);

    if (!collectionAccount) {
      return new ApiResponse(
        {} as IGetCollectionAccountsList,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );

    }

    return new ApiResponse(collectionAccount, EResponseCodes.OK);

  }

  //?Actualizar cuenta de cobro - ID viene por el body
  async updateCollectionAccounts(collectionAccount: ICollectionAccounts, id: number): Promise<ApiResponse<ICollectionAccounts | null>>{

    const res = await this.collectionAccountRepository.updateCollectionAccounts(collectionAccount, id);

    if (!res) {

      return new ApiResponse({} as ICollectionAccounts, EResponseCodes.FAIL, "Ocurrió un error en su Transacción ");

    }

    return new ApiResponse(res, EResponseCodes.OK);

  }

  //?Eliminar una cuenta de cobro - ID viene como parámetro
  async deleteCollectionAccounts(id: number): Promise<ApiResponse<boolean>>{

    const res = await this.collectionAccountRepository.deleteCollectionAccounts(id);

    if (!res) {
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(true, EResponseCodes.OK);

  }

}
