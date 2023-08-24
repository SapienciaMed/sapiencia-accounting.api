declare module "@ioc:core.AccountStatementProvider" {
    import { IAccountStatementService } from 'App/Services/AccountStatementService';
    const AccountStatementProvider: IAccountStatementService
    export default AccountStatementProvider
}