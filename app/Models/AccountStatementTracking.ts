import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { ACCOUNT_STATEMENT_TRACKING_TABLE } from "App/Constants/Tables/AccountStatement/AccountStatementTracking";
import { DateTime } from "luxon";
import AccountStatement from "./AccountStatement";

export default class AccountStatementTracking extends BaseModel {
  public static table = ACCOUNT_STATEMENT_TRACKING_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: ACCOUNT_STATEMENT_TRACKING_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: ACCOUNT_STATEMENT_TRACKING_TABLE.OBSERVATION,
    serializeAs: "observation",
  })
  public observation: string;

  @column.dateTime({
    columnName: ACCOUNT_STATEMENT_TRACKING_TABLE.TRACKING_DATE,
    serializeAs: "trackingDate",
  })
  public trackingDate: DateTime;

  @column({
    columnName: ACCOUNT_STATEMENT_TRACKING_TABLE.STATUS,
    serializeAs: "statusId",
  })
  public statusId: number;

  @column({
    columnName: ACCOUNT_STATEMENT_TRACKING_TABLE.FK_ACCOUNT_STATEMENT,
    serializeAs: "accountStatementId",
  })
  public accountStatementId: number;

  @hasOne(() => AccountStatement, {
    localKey: "accountStatementId",
    foreignKey: "id",
  })
  public accountStatement: HasOne<typeof AccountStatement>;
}
