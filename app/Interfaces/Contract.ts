import { DateTime } from "luxon";
import { IBusiness } from "./Business";

export interface IContract {
  id?: number; // CTR_CODIGO
  contractId: string; // CTR_NUMERO_CONTRATO
  businessCode: number; // CTR_CODRZO_RAZON_SOCIAL
  userModified?: string; // CTR_USUARIO_MODIFICO
  userCreate: string; // CTR_USUARIO_CREO
  createdAt?: DateTime; // CTR_FECHA_CREO
  updatedAt?: DateTime; // CTR_FECHA_MODIFICO
}

export interface IGetContractPaginated extends IContract {
  business: IBusiness;
}
