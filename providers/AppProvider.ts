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

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

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

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/
    this.app.container.singleton(
      "core.AccountStatementProvider",
      () =>
        new AccountStatementService.default(
          new AccountStatementRepository.default()
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
