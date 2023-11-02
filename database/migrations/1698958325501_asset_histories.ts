import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ASSETS_HISTORY_TABLE } from "App/Constants/Tables/Assets/AssetsHistory";
import { ASSETS_TABLE } from "App/Constants/Tables/Assets/AssetsTable";

export default class extends BaseSchema {
  protected tableName = ASSETS_HISTORY_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los cambios puntuales de los datos que se modificaron en los activos."
      );
      table
        .increments(ASSETS_HISTORY_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string(ASSETS_HISTORY_TABLE.USER_MODIFIED, 15)
        .notNullable()
        .comment("Número del documento del usuario que hizo la modificación");
      table
        .dateTime(ASSETS_HISTORY_TABLE.DATE_MODIFIED)
        .notNullable()
        .comment("Fecha en que se realizó la modificación");
      table
        .jsonb(ASSETS_HISTORY_TABLE.UPDATED_FIELDS)
        .notNullable()
        .comment("Array de los campos editados");
      table
        .integer(ASSETS_HISTORY_TABLE.FK_ASSET)
        .unsigned()
        .references(ASSETS_TABLE.ID)
        .inTable(ASSETS_TABLE.TABLE_NAME)
        .notNullable()
        .comment("Código del activo (FK ACT_ACTIVOS)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
