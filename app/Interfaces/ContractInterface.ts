import { DateTime } from "luxon";
import { ISocialReasons } from "./SocialReasonInterfaces";
import { IBusiness } from "./BusinessInterfaces";

export interface IContract {
  id?: number; // CTR_CODIGO
  contractId: string; // CTR_NUMERO_CONTRATO
  businessNameCode: number; // CTR_CODRZO_RAZON_SOCIAL
  userModified?: string; // CTR_USUARIO_MODIFICO
  userCreate: string; // CTR_USUARIO_CREO
  createdAt?: DateTime; // CTR_FECHA_CREO
  updatedAt?: DateTime; // CTR_FECHA_MODIFICO

  socialReason: IBusiness;
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
