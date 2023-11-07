declare module "@ioc:core.AssetHistoryProvider" {
  import { IAssetHistoryService } from "App/Services/AssetHistoryService";
  const AssetHistoryProvider: IAssetHistoryService;
  export default AssetHistoryProvider;
}
