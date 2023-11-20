import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { FURNITURE_INVENTORY_TABLE } from "App/Constants/Tables/Furniture/FurnitureInventory";
import { FURNITURE_TABLE } from "App/Constants/Tables/Furniture/FurnitureTable";

export default class extends BaseSchema {
  protected tableName = FURNITURE_INVENTORY_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los bienes e inmuebles inventariados");
      table
        .increments(FURNITURE_INVENTORY_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .integer(FURNITURE_INVENTORY_TABLE.FK_FURNITURE)
        .unsigned()
        .references(FURNITURE_TABLE.ID)
        .inTable(FURNITURE_TABLE.TABLE_NAME)
        .notNullable()
        .comment("Código del activo (FK TABLA BIE)");
      table
        .string(FURNITURE_INVENTORY_TABLE.USER_CREATED, 15)
        .notNullable()
        .comment("Número del documento del usuario que hizo el inventario");
      table
        .date(FURNITURE_INVENTORY_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha en que se ingresó el inventario");
      table
        .string(FURNITURE_INVENTORY_TABLE.HOUR, 5)
        .notNullable()
        .comment("Hora en que se ingresó el inventario");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
