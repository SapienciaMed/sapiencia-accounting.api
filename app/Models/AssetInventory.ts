import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { ASSETS_INVENTORY_TABLE } from "App/Constants/Tables/Assets/AssetsInventory";
import { DateTime } from "luxon";
import Asset from "./Asset";

export default class AssetInventory extends BaseModel {
  public static table = ASSETS_INVENTORY_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: ASSETS_INVENTORY_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: ASSETS_INVENTORY_TABLE.FK_ASSET,
    serializeAs: "assetId",
  })
  public assetId: number;

  @hasOne(() => Asset, {
    localKey: "assetId",
    foreignKey: "id",
  })
  public asset: HasOne<typeof Asset>;

  @column({
    columnName: ASSETS_INVENTORY_TABLE.USER_CREATED,
    serializeAs: "userCreated",
  })
  public userCreated: string;

  @column.date({
    autoCreate: true,
    columnName: ASSETS_INVENTORY_TABLE.CREATED_AT,
    serializeAs: "createdAt",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("yyyy-MM-dd") : value;
    },
  })
  public createdAt: DateTime;

  @column({
    columnName: ASSETS_INVENTORY_TABLE.HOUR,
    serializeAs: "hour",
  })
  public hour: string;
}
