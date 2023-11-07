declare module "@ioc:core.GenericMasterProvider" {
  import { IGenericMasterExternalService } from "App/Services/external/GenericExternalService";
  const GenericMasterProvider: IGenericMasterExternalService;
  export default GenericMasterProvider;
}
