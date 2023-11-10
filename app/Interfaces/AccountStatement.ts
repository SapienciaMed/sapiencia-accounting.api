import { DateTime } from "luxon";
import { IGetContractPaginated } from "./Contract";

export interface IAccountStatement {
  id?: number;
  contractCode: number;
  accountNum: number;
  expeditionDate: DateTime;
  expirationDate: DateTime;
  paymentType: string;
  valuePay: number;
  concept: string;
  userCreate: string;
  userModified?: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

export type IAccountStatementSchema = {
  contractCode: number;
  accountNum: number;
  expeditionDate: DateTime;
  expirationDate: DateTime;
  paymentType: string;
  valuePay: number;
  concept: string;
};

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
