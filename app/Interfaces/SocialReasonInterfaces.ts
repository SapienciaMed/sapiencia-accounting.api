import { DateTime } from "luxon";

export interface ISocialReasons {

  id?             : number;
  name            : string;
  nit             : string;
  direction       : string;
  email           : string;
  codMunicipality : string;
  sender          : string;
  chargeSender    : string;
  userModified?   : string;
  dateModified?   : DateTime;
  userCreate?     : string;
  dateCreate?     : DateTime;

}

export interface IFilterSocialReasons {
  page    : number;
  perPage : number;

  //?Aquí irán adicional los filtros ...

}
