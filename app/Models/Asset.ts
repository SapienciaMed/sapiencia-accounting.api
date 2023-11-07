import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { ASSETS_TABLE } from "App/Constants/Tables/Assets/AssetsTable";
import { DateTime } from "luxon";

export default class Asset extends BaseModel {
  public static table = ASSETS_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: ASSETS_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: ASSETS_TABLE.TYPE,
    serializeAs: "type",
  })
  public type: string;

  @column({
    columnName: ASSETS_TABLE.CAMPUS,
    serializeAs: "campus",
  })
  public campus: string;

  @column({
    columnName: ASSETS_TABLE.AREA,
    serializeAs: "area",
  })
  public area: string;

  @column({
    columnName: ASSETS_TABLE.STATUS,
    serializeAs: "status",
  })
  public status: string;

  @column({
    columnName: ASSETS_TABLE.OWNER_ID,
    serializeAs: "ownerId",
  })
  public ownerId: string;

  @column.date({
    columnName: ASSETS_TABLE.OWNER_DATE,
    serializeAs: "ownerDate",
  })
  public ownerDate: DateTime;

  @column({
    columnName: ASSETS_TABLE.EQUIPMENT_TYPE,
    serializeAs: "equipmentType",
  })
  public equipmentType: string;

  @column({
    columnName: ASSETS_TABLE.BRAND,
    serializeAs: "brand",
  })
  public brand: string;

  @column({
    columnName: ASSETS_TABLE.MODEL,
    serializeAs: "model",
  })
  public model: string;

  @column({
    columnName: ASSETS_TABLE.PLATE,
    serializeAs: "plate",
  })
  public plate: string;

  @column({
    columnName: ASSETS_TABLE.SERIAL,
    serializeAs: "serial",
  })
  public serial: string;

  @column({
    columnName: ASSETS_TABLE.CPU,
    serializeAs: "cpu",
  })
  public cpu: string;

  @column({
    columnName: ASSETS_TABLE.RAM,
    serializeAs: "ram",
  })
  public ram: string;

  @column({
    columnName: ASSETS_TABLE.STORAGE,
    serializeAs: "storage",
  })
  public storage: string;

  @column({
    columnName: ASSETS_TABLE.OS,
    serializeAs: "os",
  })
  public os: string;

  @column({
    columnName: ASSETS_TABLE.OBSERVATIONS,
    serializeAs: "observations",
  })
  public observations: string;

  @column({
    columnName: ASSETS_TABLE.USER_MODIFIED,
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: ASSETS_TABLE.UPDATED_AT,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: ASSETS_TABLE.USER_CREATED,
    serializeAs: "userCreated",
  })
  public userCreated: string;

  @column.dateTime({
    autoCreate: true,
    columnName: ASSETS_TABLE.CREATED_AT,
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;
}
