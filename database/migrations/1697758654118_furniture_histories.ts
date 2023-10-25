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
        .references("BIE_CODIGO")
        .inTable("BIE_BIENES_INMUEBLE")
        .notNullable()
        .comment("Código de la razón social (FK RZO_RAZONES_SOCIALES)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
