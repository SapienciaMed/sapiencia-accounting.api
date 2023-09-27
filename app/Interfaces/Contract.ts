import { DateTime } from "luxon";
import { IBusiness, IBusinessPaginated } from "./Business";

export type IContractSchema = {
  contractId: string;
  businessCode: number;
  creditAccount: string;
  debitAccount: string;
};

export type IContractPaginateSchema = {
  id?: number;
  businessCode?: number;
  page: number;
  perPage: number;
};

export type IContractPaginated = Omit<
  IContract,
  "userModified" | "userCreate" | "createdAt" | "updatedAt"
>;

export interface IContractInfoCleared extends IContractPaginated {
  business: IBusinessPaginated & { municipality: string };
}

export type IContractInfoSelect = {
  value: number;
  name: string;
  data: Pick<IBusiness, "nit" | "name">;
};

export type IContractInfo = {
  id: number;
  contractId: string;
  businessCode: number;
  userModified: string;
  userCreate: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  debitAccount: string;
  creditAccount: string;
  business: Pick<IBusiness, "nit" | "name">;
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

export type IContractUpdateSchema = {
  contractId?: string;
  businessCode?: number;
  debitAccount?: string;
  creditAccount?: string;
};
