import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { FURNITURE_TABLE } from "App/Constants/Tables/Furniture/FurnitureTable";
import { DateTime } from "luxon";

export default class Furniture extends BaseModel {
  public static table = FURNITURE_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: FURNITURE_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: FURNITURE_TABLE.PLATE,
    serializeAs: "plate",
  })
  public plate: string;

  @column({
    columnName: FURNITURE_TABLE.DESCRIPTION,
    serializeAs: "description",
  })
  public description: string;

  @column({
    columnName: FURNITURE_TABLE.ACQUISITION_DATE,
    serializeAs: "acquisitionDate",
    serialize: (value: Date) => {
      const parsedValue = DateTime.fromJSDate(value);
      return parsedValue
        ? parsedValue.setLocale("zh").toFormat("yyyy/MM/dd")
        : value;
    },
  })
  public acquisitionDate: DateTime;

  @column({
    columnName: FURNITURE_TABLE.EQUIPMENT_STATUS,
    serializeAs: "equipmentStatus",
  })
  public equipmentStatus: number;

  @column({
    columnName: FURNITURE_TABLE.OWNER_ID,
    serializeAs: "userIdentification",
  })
  public userIdentification: string;

  @column({
    columnName: FURNITURE_TABLE.AREA,
    serializeAs: "area",
  })
  public area: number;

  @column({
    columnName: FURNITURE_TABLE.OWNER_FULL_NAME,
    serializeAs: "fullName",
  })
  public fullName: string;

  @column({
    columnName: FURNITURE_TABLE.MODEL,
    serializeAs: "model",
  })
  public model: string;

  @column({
    columnName: FURNITURE_TABLE.BRAND,
    serializeAs: "brand",
  })
  public brand: string;

  @column({
    columnName: FURNITURE_TABLE.MEASURE,
    serializeAs: "measure",
  })
  public measure: string;

  @column({
    columnName: FURNITURE_TABLE.ACTIVE_OWNER,
    serializeAs: "activeOwner",
  })
  public activeOwner: number;

  @column({
    columnName: FURNITURE_TABLE.OBSERVATIONS,
    serializeAs: "observation",
  })
  public observation: string;

  @column({
    columnName: FURNITURE_TABLE.CLERK,
    serializeAs: "clerk",
  })
  public clerk: number;

  @column.dateTime({
    autoCreate: true,
    columnName: FURNITURE_TABLE.CREATED_AT,
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoUpdate: true,
    columnName: FURNITURE_TABLE.UPDATED_AT,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: FURNITURE_TABLE.USER_CREATED,
    serializeAs: "userCreated",
  })
  public userCreated: string;

  @column({
    columnName: FURNITURE_TABLE.USER_MODIFIED,
    serializeAs: "userModified",
  })
  public userModified: string;
}
