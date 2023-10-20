import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "BIH_BIENES_INMUEBLE_HISTORICO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena el histórico de actualizaciones en un bien mueble."
      );
      table
        .increments("BIH_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria.");
      table
        .dateTime("BIH_FECHA")
        .notNullable()
        .comment("Fecha de actualización.");
      table.jsonb("BIH_CAMPOS_UPDATE").notNullable();
      table
        .integer("BIH_CODBIE_CODIGO")
        .unsigned()
        .notNullable()
        .comment("Código del bien mueble (FK BIE_BIENES_MUEBLES)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
