declare module "@ioc:core.AssetInventoryProvider" {
  import { IAssetInventoryService } from "App/Services/AssetInventoryService/AssetInventoryService";
  const AssetInventoryProvider: IAssetInventoryService;
  export default AssetInventoryProvider;
}
