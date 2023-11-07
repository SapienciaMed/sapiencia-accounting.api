import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { IFurnitureHistoryChanges } from "App/Interfaces/FurnitureHistory";
import { DateTime } from "luxon";

export default class FurnitureHistory extends BaseModel {
  public static table = "BIH_BIENES_INMUEBLE_HISTORICO";

  @column({
    isPrimary: true,
    columnName: "BIH_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column.dateTime({
    autoCreate: true,
    columnName: "BIH_FECHA",
    serializeAs: "createdAt",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("dd-MM-yyyy") : value;
    },
  })
  public createdAt: DateTime;

  @column({
    columnName: "BIH_CAMPOS_UPDATE",
    serializeAs: "changes",
  })
  public changes: IFurnitureHistoryChanges;

  @column({
    columnName: "BIH_CODBIE_CODIGO",
    serializeAs: "furnitureId",
  })
  public furnitureId: number;
}
