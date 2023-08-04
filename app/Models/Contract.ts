import { DateTime } from 'luxon';
import { BaseModel,
         column,
         HasOne,
         hasOne } from '@ioc:Adonis/Lucid/Orm';
import Env from "@ioc:Adonis/Core/Env";
import SocialReason from './SocialReason';

export default class Contract extends BaseModel {

  public static table = "CTR_CONTRATOS";

  @column({ isPrimary: true,
            columnName: "CTR_CODIGO",
            serializeAs: "id" })
  public id: number;

  @column({
    columnName: "CTR_NUMERO_CONTRATO",
    serializeAs: "numContract",
  })
  public numContract: string;

  @column({ columnName: "CTR_CODRZO_RAZON_SOCIAL",
            serializeAs: "codSocialReason" })
  public codSocialReason: number;

  @column({
    columnName: "CTR_USUARIO_MODIFICO",
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: "CTR_FECHA_MODIFICO",
    serializeAs: "dateModified",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateModified: DateTime;

  @column({
    columnName: "CTR_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string | undefined = Env.get("USER_ID");

  @column.dateTime({
    autoCreate: true,
    columnName: "CTR_FECHA_CREO",
    serializeAs: "dateCreate",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateCreate: DateTime;

  //?Relaciones ORM
  //*Contrato pertenece a una razón social.
  @hasOne(() => SocialReason, {
    localKey: "codSocialReason",
    foreignKey: "id",
  })
  public socialReason: HasOne<typeof SocialReason>;

}
