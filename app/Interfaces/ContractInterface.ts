import { DateTime } from "luxon";
import { ISocialReasons } from './SocialReasonInterfaces';

// export interface IContract {

//   id?             : number;
//   numContract     : string;
//   codSocialReason : number;
//   userModified?   : string;
//   dateModified?   : DateTime;
//   userCreate?     : string;
//   dateCreate?     : DateTime;

// }

export interface IContract {
  id?: number; // CTR_CODIGO
  contractId: number; // CTR_NUMERO_CONTRATO
  businessNameCode: number; // CTR_CODRZO_RAZON_SOCIAL
  userModified?: string; // CTR_USUARIO_MODIFICO
  userCreate: string; // CTR_USUARIO_CREO
  createdAt?: DateTime; // CTR_FECHA_CREO
  updatedAt?: DateTime; // CTR_FECHA_MODIFICO
}

export interface IGetContractList {

  contract: IContract | null;
  socialReason: ISocialReasons | null;

}

export interface IFilterContract {
  page: number;
  perPage: number;

  //?Aquí irán adicional los filtros ...

}
