import { DateTime } from "luxon";
import { IContract } from "./ContractInterface";

export interface IAccountStatement {
  id?: number; // CTC_CODIGO
  contractCode: number; // CTC_CODCTR_CONTRATO
  accountNum: number; // CTC_NUMERO
  expeditionDate: DateTime; // CTC_FECHA_EXPEDICION
  expirationDate: DateTime; // CTC_FECHA_VENCIMIENTO
  paymentType: string; // CTC_FORMA_PAGO
  valuePay: number; // CTC_VALOR
  concept: string; // CTC_CONCEPTO
  userCreate: string; // CTC_USUARIO_CREO
  userModified?: string; // CTC_USUARIO_MODIFICO
  createdAt?: DateTime; // CTC_FECHA_CREO
  updatedAt?: DateTime; // CTC_FECHA_MODIFICO

  contract?: IContract;
}

export interface IAccountStatementFilters {
  accountNum?: string;
  contractCode?: number;
  nit?: number;
  expirationDate?: DateTime;
  page: number;
  perPage: number;
}
