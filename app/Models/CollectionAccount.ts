import { DateTime } from 'luxon';
import { BaseModel,
         column,
         hasOne,
         HasOne } from '@ioc:Adonis/Lucid/Orm';
import Env from "@ioc:Adonis/Core/Env";
import Contract from './Contract';

export default class CollectionAccount extends BaseModel {

  public static table = "CTC_CUENTAS_COBRO";

  @column({ isPrimary: true,
            columnName: "CTC_CODIGO",
            serializeAs: "id" })
  public id: number;

  @column({
    columnName: "CTC_CODCTR_CONTRATO",
    serializeAs: "codContract",
  })
  public codContract: number;

  @column({
    columnName: "CTC_NUMERO",
    serializeAs: "numAccount",
  })
  public numAccount: number;

  @column.dateTime({
    columnName: "CTC_FECHA_EXPEDISION",
    serializeAs: "dateExpedition",
  })
  public dateExpedition: DateTime;

  @column.dateTime({
    columnName: "CTC_FECHA_VENCIMIENTO",
    serializeAs: "dateExpired",
  })
  public dateExpired: DateTime;

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
    serializeAs: "dateModified",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateModified: DateTime;

  @column({
    columnName: "CTC_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string | undefined = Env.get("USER_ID");

  @column.dateTime({
    autoCreate: true,
    columnName: "CTC_FECHA_CREO",
    serializeAs: "dateCreate",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateCreate: DateTime;


  //?Relaciones ORM
  //*Cuenta de Cobro pertenece a un contrato
  @hasOne(() => Contract, {
    localKey: "codContract",
    foreignKey: "id",
  })
  public contract: HasOne<typeof Contract>;


}
