import { DateTime } from "luxon";
import { IGetContractPaginated } from "./Contract";

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
}

export interface IGetAccountStatementPaginated {
  id?: number;
  contractCode: number;
  accountNum: number;
  expeditionDate: string;
  expirationDate: string;
  paymentType: string;
  valuePay: number;
  concept: string;
  userCreate: string;
  userModified?: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  contract: IGetContractPaginated;
}

export interface IGetAccountStatement {
  accountNum?: number;
  contractCode?: number;
  nit?: string;
  expeditionDate?: DateTime;
  page: number;
  perPage: number;
}

export interface IUpdateAccountStatement {
  contractCode?: number;
  valuePay?: number;
  concept?: string;
}

export interface IAccountStatementDownloadPDF {
  responsive: boolean;
}
