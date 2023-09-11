import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import AccountStatementStatus from "./AccountStatementStatus";

export default class AccountStatementTracking extends BaseModel {
  public static table = "SCC_SEGUIMIENTO_CUENTA_COBRO";
  @column({
    isPrimary: true,
    columnName: "SCC_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "SCC_OBSERVACION",
    serializeAs: "observation",
  })
  public observation: string;

  @column.dateTime({
    columnName: "SCC_FECHA_SEGUIMIENTO",
    serializeAs: "trackingDate",
  })
  public trackingDate: DateTime;

  @column({
    columnName: "SCC_CODETO_ESTADO",
    serializeAs: "statusId",
  })
  public statusId: number;

  @column({
    columnName: "SCC_CODCTC_CUENTAS_COBRO",
    serializeAs: "accountStatementId",
  })
  public accountStatementId: number;

  @hasOne(() => AccountStatementStatus, {
    localKey: "statusId",
    foreignKey: "id",
  })
  public status: HasOne<typeof AccountStatementStatus>;
}
