import { DateTime } from "luxon";
import { IBusiness } from "./Business";

export type IContractSchema = {
  contractId: string;
  businessCode: number;
  creditAccount: string;
  debitAccount: string;
};

export interface IContract {
  id?: number; // CTR_CODIGO
  contractId: string; // CTR_NUMERO_CONTRATO
  businessCode: number; // CTR_CODRZO_RAZON_SOCIAL
  userModified?: string; // CTR_USUARIO_MODIFICO
  userCreate: string; // CTR_USUARIO_CREO
  createdAt?: DateTime; // CTR_FECHA_CREO
  updatedAt?: DateTime; // CTR_FECHA_MODIFICO
  debitAccount: string; // CTR_CUENTA_CONTABLE_DEBITO
  creditAccount: string; // CTR_CUENTA_CONTABLE_CREDITO
}

export interface IGetContractPaginated extends IContract {
  business: IBusiness;
}
