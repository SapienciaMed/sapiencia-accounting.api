import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Business extends BaseModel {
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
    columnName: "RZO_CODIGO_MUNICIPIO",
    serializeAs: "municipalityCode",
  })
  public municipalityCode: string;

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

  @column({
    columnName: "RZO_TELEFONO",
    serializeAs: "phone",
  })
  public phone: string;
}
