declare module "@ioc:core.AssetProvider" {
  import { IAssetService } from "App/Services/AssetService/AssetService";
  const AssetProvider: IAssetService;
  export default AssetProvider;
}
