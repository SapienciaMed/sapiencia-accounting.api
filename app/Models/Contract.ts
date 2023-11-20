import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Business from "./Business";

export default class Contract extends BaseModel {
  public static table = "CTR_CONTRATOS";
  @column({
    isPrimary: true,
    columnName: "CTR_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "CTR_NUMERO_CONTRATO",
    serializeAs: "contractId",
  })
  public contractId: string;

  @column({
    columnName: "CTR_CODRZO_RAZON_SOCIAL",
    serializeAs: "businessCode",
  })
  public businessCode: number;

  @column({
    columnName: "CTR_CORREO_ELECTRONICO",
    serializeAs: "email",
  })
  public email: string;

  @column({
    columnName: "CTR_REMISOR",
    serializeAs: "sender",
  })
  public sender: string;

  @column({
    columnName: "CTR_CARGO_REMISOR",
    serializeAs: "chargeSender",
  })
  public chargeSender: string;

  @column({
    columnName: "CTR_USUARIO_MODIFICO",
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: "CTR_FECHA_MODIFICO",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: "CTR_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "CTR_FECHA_CREO",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column({
    columnName: "CTR_CUENTA_CONTABLE_DEBITO",
    serializeAs: "debitAccount",
  })
  public debitAccount: string;

  @column({
    columnName: "CTR_CUENTA_CONTABLE_CREDITO",
    serializeAs: "creditAccount",
  })
  public creditAccount: string;

  @hasOne(() => Business, {
    localKey: "businessCode",
    foreignKey: "id",
  })
  public business: HasOne<typeof Business>;
}
