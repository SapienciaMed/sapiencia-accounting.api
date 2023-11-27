declare module "@ioc:core.FurnitureInventoryProvider" {
  import { IFurnitureInventoryService } from "App/Services/FurnitureInventoryService";
  const FurnitureInventoryProvider: IFurnitureInventoryService;
  export default FurnitureInventoryProvider;
}
