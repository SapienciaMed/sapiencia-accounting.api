declare module "@ioc:core.AssetInventoryProvider" {
  import { IAssetInventoryService } from "App/Services/AssetInventoryService";
  const AssetInventoryProvider: IAssetInventoryService;
  export default AssetInventoryProvider;
}
