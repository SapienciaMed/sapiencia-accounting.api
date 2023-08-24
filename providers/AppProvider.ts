import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const BusinessService = await import("App/Services/BusinessService");
    const CollectionAccountService = await import("App/Services/CollectionAccountService");
    const AccountStatementService = await import("App/Services/AccountStatementService")

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const BusinessRepository = await import("App/Repositories/BusinessRepository");
    const CollectionAccountRepository = await import("App/Repositories/CollectionAccountRepository");
    const AccountStatementRepository = await import("App/Repositories/AccountStatementRepository")

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.BusinessProvider",
      () => new BusinessService.default(new BusinessRepository.default())
    );

    this.app.container.singleton(
      "core.CollectionAccountProvider",
      () => new CollectionAccountService.default(new CollectionAccountRepository.default())
    );

    this.app.container.singleton(
      "core.AccountStatementProvider",
      () => new AccountStatementService.default(new AccountStatementRepository.default())
    )
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
