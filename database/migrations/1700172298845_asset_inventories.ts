import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ASSETS_INVENTORY_TABLE } from "App/Constants/Tables/Assets/AssetsInventory";
import { ASSETS_TABLE } from "App/Constants/Tables/Assets/AssetsTable";

export default class extends BaseSchema {
  protected tableName = ASSETS_INVENTORY_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los activos tecnológicos inventariados"
      );
      table
        .increments(ASSETS_INVENTORY_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .integer(ASSETS_INVENTORY_TABLE.FK_ASSET)
        .unsigned()
        .references(ASSETS_TABLE.ID)
        .inTable(ASSETS_TABLE.TABLE_NAME)
        .notNullable()
        .comment("Código del activo (FK TABLA ACT)");
      table
        .string(ASSETS_INVENTORY_TABLE.USER_CREATED, 15)
        .notNullable()
        .comment("Número del documento del usuario que hizo el inventario");
      table
        .date(ASSETS_INVENTORY_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha en que se ingresó el inventario");
      table
        .string(ASSETS_INVENTORY_TABLE.HOUR, 5)
        .notNullable()
        .comment("Hora en que se ingresó el inventario");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
