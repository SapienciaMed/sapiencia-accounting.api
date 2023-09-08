import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "SCC_SEGUIMIENTO_CUENTA_COBRO";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena el seguimiento de las cuentas de cobro"
      );
      table
        .increments("SCC_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string("SCC_OBSERVACION", 500)
        .notNullable()
        .comment("Observaciones de cada estado de seguimiento");
      table
        .dateTime("SCC_FECHA_SEGUIMIENTO")
        .nullable()
        .comment("Fecha de seguimiento de la cuenta de cobro");
      table
        .integer("SCC_CODETO_ESTADO")
        .unsigned()
        .references("ETO_CODIGO")
        .inTable("ETO_ESTADO")
        .notNullable()
        .comment("Código del estado (FK ETO_ESTADO)");
      table
        .integer("SCC_CODCTC_CUENTAS_COBRO")
        .unsigned()
        .references("CTC_CODIGO")
        .inTable("CTC_CUENTAS_COBRO")
        .notNullable()
        .comment("Código de la cuenta de cobro (FK CTC_CUENTAS_COBRO)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
