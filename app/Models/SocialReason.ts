import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import Env from "@ioc:Adonis/Core/Env";

export default class SocialReason extends BaseModel {

  public static table = "RZO_RAZONES_SOCIALES";

  @column({ isPrimary: true,
            columnName: "RZO_CODIGO",
            serializeAs: "id" })
  public id: number;

  @column({
    columnName: "RZO_NOMBRE",
    serializeAs: "name",
  })
  public name: string;

  @column({
    columnName: "RZO_NIT",
    serializeAs: "nit",
  })
  public nit: string;

  @column({
    columnName: "RZO_DIRECCION",
    serializeAs: "direction",
  })
  public direction: string;

  @column({
    columnName: "RZO_CORREO_ELECTRONICO",
    serializeAs: "email",
  })
  public email: string;

  @column({
    columnName: "RZO_CODIGO_MUNICIPIO",
    serializeAs: "codMunicipality",
  })
  public codMunicipality: string;

  @column({
    columnName: "RZO_REMISOR",
    serializeAs: "sender",
  })
  public sender: string;

  @column({
    columnName: "RZO_CARGO_REMISOR",
    serializeAs: "chargeSender",
  })
  public chargeSender: string;

  @column({
    columnName: "RZO_USUARIO_MODIFICO",
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: "RZO_FECHA_MODIFICO",
    serializeAs: "dateModified",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateModified: DateTime;

  @column({
    columnName: "RZO_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string | undefined = Env.get("USER_ID");

  @column.dateTime({
    autoCreate: true,
    columnName: "RZO_FECHA_CREO",
    serializeAs: "dateCreate",
    prepare: () => DateTime.now().toSQL(),
  })
  public dateCreate: DateTime;

  //TODO: Posibles relaciones ORM pendientes.


}
