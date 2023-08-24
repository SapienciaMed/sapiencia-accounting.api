import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class BusinessName extends BaseModel {
  public static table = "RZO_RAZONES_SOCIALES";

  @column({
    isPrimary: true,
    columnName: "RZO_CODIGO",
    serializeAs: "id",
  })
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
    serializeAs: "address",
  })
  public address: string;

  @column({
    columnName: "RZO_CORREO_ELECTRONICO",
    serializeAs: "email",
  })
  public email: string;

  @column({
    columnName: "RZO_CODIGO_MUNICIPIO",
    serializeAs: "municipalityCode",
  })
  public municipalityCode: string;

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
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: "RZO_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "RZO_FECHA_CREO",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;
}
