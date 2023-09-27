import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const AccountStatementService = await import(
      "App/Services/AccountStatementService"
    );
    const AccountStatementStatusService = await import(
      "App/Services/AccountStatementStatusService"
    );
    const AccountStatementTrackingService = await import(
      "App/Services/AccountStatementTrackingService"
    );
    const BusinessService = await import("App/Services/BusinessService");
    const ContractService = await import("App/Services/ContractService");
    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/
    const GenericMasterService = await import(
      "App/Services/external/GenericExternalService"
    );
    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const AccountStatementRepository = await import(
      "App/Repositories/AccountStatementRepository"
    );
    const AccountStatementStatusRepository = await import(
      "App/Repositories/AccountStatementStatusRepository"
    );
    const AccountStatementTrackingRepository = await import(
      "App/Repositories/AccountStatementTrackingRepository"
    );
    const BusinessRepository = await import(
      "App/Repositories/BusinessRepository"
    );
    const ContractRepository = await import(
      "App/Repositories/ContractRepository"
    );
    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/
    this.app.container.singleton(
      "core.AccountStatementProvider",
      () =>
        new AccountStatementService.default(
          new AccountStatementRepository.default(),
          new GenericMasterService.default()
        )
    );
    this.app.container.singleton(
      "core.AccountStatementStatusProvider",
      () =>
        new AccountStatementStatusService.default(
          new AccountStatementStatusRepository.default()
        )
    );
    this.app.container.singleton(
      "core.AccountStatementTrackingProvider",
      () =>
        new AccountStatementTrackingService.default(
          new AccountStatementTrackingRepository.default()
        )
    );
    this.app.container.singleton(
      "core.BusinessProvider",
      () =>
        new BusinessService.default(
          new BusinessRepository.default(),
          new GenericMasterService.default()
        )
    );
    this.app.container.singleton(
      "core.ContractProvider",
      () =>
        new ContractService.default(
          new ContractRepository.default(),
          new GenericMasterService.default()
        )
    );
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
