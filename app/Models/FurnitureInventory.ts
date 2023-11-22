import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { FURNITURE_INVENTORY_TABLE } from "App/Constants/Tables/Furniture/FurnitureInventory";
import { DateTime } from "luxon";
import Furniture from "./Furniture";

export default class FurnitureInventory extends BaseModel {
  public static table = FURNITURE_INVENTORY_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: FURNITURE_INVENTORY_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: FURNITURE_INVENTORY_TABLE.FK_FURNITURE,
    serializeAs: "furnitureId",
  })
  public furnitureId: number;

  @column({
    columnName: FURNITURE_INVENTORY_TABLE.USER_CREATED,
    serializeAs: "userCreated",
  })
  public userCreated: string;

  @column.date({
    autoCreate: true,
    columnName: FURNITURE_INVENTORY_TABLE.CREATED_AT,
    serializeAs: "createdAt",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("yyyy-MM-dd") : value;
    },
  })
  public createdAt: DateTime;

  @column({
    columnName: FURNITURE_INVENTORY_TABLE.HOUR,
    serializeAs: "hour",
  })
  public hour: string;

  @hasOne(() => Furniture, {
    localKey: "furnitureId",
    foreignKey: "id",
  })
  public furniture: HasOne<typeof Furniture>;
}
