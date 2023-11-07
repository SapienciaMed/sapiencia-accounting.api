declare module "@ioc:core.AccountStatementTrackingProvider" {
  import { IAccountStatementTrackingService } from "App/Services/AccountStatementTrackingService";
  const AccountStatementTrackingProvider: IAccountStatementTrackingService;
  export default AccountStatementTrackingProvider;
}
