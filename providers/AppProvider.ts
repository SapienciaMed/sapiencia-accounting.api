import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const AccountStatementService = await import(
      "App/Services/AccountStatementService/AccountStatementService"
    );
    const AccountStatementTrackingService = await import(
      "App/Services/AccountStatementTrackingService"
    );
    const BusinessService = await import("App/Services/BusinessService");
    const ContractService = await import("App/Services/ContractService");
    const FurnitureService = await import(
      "App/Services/FurnitureService/FurnitureService"
    );
    const FurnitureHistoryService = await import(
      "App/Services/FurnitureHistoryService"
    );
    const AssetService = await import("App/Services/AssetService/AssetService");
    const AssetHistoryService = await import(
      "App/Services/AssetHistoryService"
    );
    const AssetInventoryService = await import(
      "App/Services/AssetInventoryService/AssetInventoryService"
    );
    const FurnitureInventoryService = await import(
      "App/Services/FurnitureInventoryService"
    );
    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/
    const GenericMasterService = await import(
      "App/Services/external/GenericExternalService"
    );
    const PayrollService = await import(
      "App/Services/external/PayrollExternalService"
    );
    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const AccountStatementRepository = await import(
      "App/Repositories/AccountStatementRepository"
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
    const FurnitureRepository = await import(
      "App/Repositories/FurnitureRepository"
    );
    const FurnitureHistoryRepository = await import(
      "App/Repositories/FurnitureHistoryRepository"
    );
    const AssetRepository = await import("App/Repositories/AssetRepository");
    const AssetHistoryRepository = await import(
      "App/Repositories/AssetHistoryRepository"
    );
    const AssetInventoryRepository = await import(
      "App/Repositories/AssetInventoryRepository"
    );
    const FurnitureInventoryRepository = await import(
      "App/Repositories/FurnitureInventoryRepository"
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
    this.app.container.singleton(
      "core.FurnitureProvider",
      () =>
        new FurnitureService.default(
          new FurnitureRepository.default(),
          new PayrollService.default(),
          new GenericMasterService.default(),
          new FurnitureHistoryRepository.default()
        )
    );
    this.app.container.singleton(
      "core.FurnitureHistoryProvider",
      () =>
        new FurnitureHistoryService.default(
          new FurnitureHistoryRepository.default(),
          new GenericMasterService.default()
        )
    );
    this.app.container.singleton(
      "core.AssetProvider",
      () =>
        new AssetService.default(
          new AssetRepository.default(),
          new PayrollService.default(),
          new AssetHistoryRepository.default(),
          new GenericMasterService.default()
        )
    );
    this.app.container.singleton(
      "core.AssetHistoryProvider",
      () =>
        new AssetHistoryService.default(
          new AssetHistoryRepository.default(),
          new GenericMasterService.default()
        )
    );
    this.app.container.singleton(
      "core.AssetInventoryProvider",
      () =>
        new AssetInventoryService.default(
          new AssetInventoryRepository.default(),
          new AssetRepository.default(),
          new AssetService.default(
            new AssetRepository.default(),
            new PayrollService.default(),
            new AssetHistoryRepository.default(),
            new GenericMasterService.default()
          )
        )
    );
    this.app.container.singleton(
      "core.FurnitureInventoryProvider",
      () =>
        new FurnitureInventoryService.default(
          new FurnitureInventoryRepository.default(),
          new FurnitureService.default(
            new FurnitureRepository.default(),
            new PayrollService.default(),
            new GenericMasterService.default(),
            new FurnitureHistoryRepository.default()
          )
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
