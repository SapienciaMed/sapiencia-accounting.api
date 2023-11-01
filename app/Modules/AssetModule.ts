declare module "@ioc:core.AssetProvider" {
  import { IAssetService } from "App/Services/AssetService";
  const AssetProvider: IAssetService;
  export default AssetProvider;
}
