import { DateTime } from "luxon";
import { IContract } from "./ContractInterface";
import { ISocialReasons } from "./SocialReasonInterfaces";

export interface ICollectionAccounts {
  id?: number;
  codContract: number;
  numAccount: number;
  dateExpedition: DateTime;
  dateExpired: DateTime;
  paymentType: string;
  valuePay: number;
  concept: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IGetCollectionAccountsList {
  collectionAccount: ICollectionAccounts | null;
  contract: IContract | null;
  socialReason: ISocialReasons | null;
}

export interface IFilterCollectionAccounts {
  page: number;
  perPage: number;

  //?Aquí irán adicional los filtros ...
  idAccount?: number;
  idContract?: number;
  idSocialReason?: number;
  dateExpired?: Date;
}
