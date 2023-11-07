import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { ASSETS_HISTORY_TABLE } from "App/Constants/Tables/Assets/AssetsHistory";
import { IAssetHistoryChanges } from "App/Interfaces/AssetHistory";

import { DateTime } from "luxon";

export default class AssetHistory extends BaseModel {
  public static table = ASSETS_HISTORY_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: ASSETS_HISTORY_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: ASSETS_HISTORY_TABLE.USER_MODIFIED,
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoCreate: true,
    columnName: ASSETS_HISTORY_TABLE.DATE_MODIFIED,
    serializeAs: "createdAt",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("dd-MM-yyyy") : value;
    },
  })
  public createdAt: DateTime;

  @column({
    columnName: ASSETS_HISTORY_TABLE.UPDATED_FIELDS,
    serializeAs: "changes",
  })
  public changes: IAssetHistoryChanges;

  @column({
    columnName: ASSETS_HISTORY_TABLE.FK_ASSET,
    serializeAs: "assetId",
  })
  public assetId: number;
}
