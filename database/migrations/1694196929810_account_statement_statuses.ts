import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ETO_ESTADO";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los estados de seguimiento para las cuentas de cobro"
      );
      table
        .increments("ETO_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string("ETO_NOMBRE", 20)
        .notNullable()
        .comment("Nombre de estado para el seguimiento de cuenta de cobro");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
