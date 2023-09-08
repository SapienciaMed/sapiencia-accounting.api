import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AccountStatementStatus extends BaseModel {
  public static table = "ETO_ESTADO";
  @column({
    isPrimary: true,
    columnName: "ETO_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "ETO_NOMBRE",
    serializeAs: "status_name",
  })
  public status_name: string;
}
