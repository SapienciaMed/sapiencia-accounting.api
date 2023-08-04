import { DateTime } from "luxon";
import { ISocialReasons } from './SocialReasonInterfaces';

export interface IContract {

  id?             : number;
  numContract     : string;
  codSocialReason : number;
  userModified?   : string;
  dateModified?   : DateTime;
  userCreate?     : string;
  dateCreate?     : DateTime;

}

export interface IGetContractList {

  contract          : IContract           | null;
  socialReason      : ISocialReasons      | null;

}

export interface IFilterContract {
  page    : number;
  perPage : number;

  //?Aquí irán adicional los filtros ...

}
