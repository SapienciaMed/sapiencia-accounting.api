declare module "@ioc:core.BusinessProvider" {
  import { IBusinessService } from "App/Services/BusinessService";

  const BusinessProvider: IBusinessService;
  export default BusinessProvider;
}
