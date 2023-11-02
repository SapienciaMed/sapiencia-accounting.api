import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import AccountStatementTracking from "./AccountStatementTracking";
import Contract from "./Contract";

export default class AccountStatement extends BaseModel {
  public static table = "CTC_CUENTAS_COBRO";
  @column({
    isPrimary: true,
    columnName: "CTC_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "CTC_CODCTR_CONTRATO",
    serializeAs: "contractCode",
  })
  public contractCode: number;

  @hasOne(() => Contract, {
    localKey: "contractCode",
    foreignKey: "id",
  })
  public contract: HasOne<typeof Contract>;

  @column({
    columnName: "CTC_NUMERO",
    serializeAs: "accountNum",
  })
  public accountNum: number;

  @column.dateTime({
    columnName: "CTC_FECHA_EXPEDICION",
    serializeAs: "expeditionDate",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("yyyy/MM/dd") : value;
    },
  })
  public expeditionDate: DateTime;

  @column.dateTime({
    columnName: "CTC_FECHA_VENCIMIENTO",
    serializeAs: "expirationDate",
  })
  public expirationDate: DateTime;

  @column({
    columnName: "CTC_FORMA_PAGO",
    serializeAs: "paymentType",
  })
  public paymentType: string;

  @column({
    columnName: "CTC_VALOR",
    serializeAs: "valuePay",
  })
  public valuePay: number;

  @column({
    columnName: "CTC_CONCEPTO",
    serializeAs: "concept",
  })
  public concept: string;

  @column({
    columnName: "CTC_USUARIO_MODIFICO",
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: "CTC_FECHA_MODIFICO",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: "CTC_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "CTC_FECHA_CREO",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @hasOne(() => AccountStatementTracking)
  public tracking: HasOne<typeof AccountStatementTracking>;
}
