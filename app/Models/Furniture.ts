import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Furniture extends BaseModel {
  public static table = "BIE_BIENES_INMUEBLE";

  @column({
    isPrimary: true,
    columnName: "BIE_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "BIE_PLACA_ACTIVO",
    serializeAs: "plate",
  })
  public plate: string;

  @column({
    columnName: "BIE_TIPO_ACTIVO_DESCRIPCION",
    serializeAs: "description",
  })
  public description: string;

  @column({
    columnName: "BIE_FECHA_ADQUISICION",
    serializeAs: "acquisitionDate",
    prepare: (value: string) => DateTime.fromISO(value).toISODate(),
  })
  public acquisitionDate: DateTime;

  @column({
    columnName: "BIE_ESTADO_EQUIPO",
    serializeAs: "equipmentStatus",
  })
  public equipmentStatus: number;

  @column({
    columnName: "BIE_CC_USUARIO",
    serializeAs: "userIdentification",
  })
  public userIdentification: string;

  @column({
    columnName: "BIE_AREA",
    serializeAs: "area",
  })
  public area: number;

  @column({
    columnName: "BIE_NOMBRE_APELLIDO",
    serializeAs: "fullName",
  })
  public fullName: string;

  @column({
    columnName: "BIE_MODELO",
    serializeAs: "model",
  })
  public model: string;

  @column({
    columnName: "BIE_MARCA",
    serializeAs: "model",
  })
  public brand: string;

  @column({
    columnName: "BIE_MEDIDAS",
    serializeAs: "measure",
  })
  public measure: string;

  @column({
    columnName: "BIE_PROPIETARIO_ACTIVO",
    serializeAs: "activeOwner",
  })
  public activeOwner: number;

  @column({
    columnName: "BIE_OBSERVACION",
    serializeAs: "observation",
  })
  public observation: string;

  @column({
    columnName: "BIE_FUNCIONARIO",
    serializeAs: "clerk",
  })
  public clerk: number;
}
