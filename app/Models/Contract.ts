import {
  BaseModel,
  column,
  HasOne,
  hasOne
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import BusinessName from './BusinessName';

export default class Contract extends BaseModel {
  public static table = "CTR_CONTRATOS";

  @column({
    isPrimary: true,
    columnName: "CTR_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "CTR_NUMERO_CONTRATO",
    serializeAs: "contractId",
  })
  public contractId: number;

  @column({
    columnName: "CTR_CODRZO_RAZON_SOCIAL",
    serializeAs: "businessNameCode"
  })
  public businessNameCode: number;

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

  // Contrato pertenece a una razón social
  @hasOne(() => BusinessName, {
    localKey: "businessNameCode",
    foreignKey: "id",
  })
  public socialReason: HasOne<typeof BusinessName>;

}
