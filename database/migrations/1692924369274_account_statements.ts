import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "CTC_CUENTAS_COBRO";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las cuentas de cobro de los contratos");
      table
        .increments("CTC_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .integer("CTC_CODCTR_CONTRATO")
        .unsigned()
        .references("CTR_CODIGO")
        .inTable("CTR_CONTRATOS")
        .notNullable()
        .comment("Código del contrato (FK CTR_CONTRATOS)");
      table
        .integer("CTC_NUMERO")
        .unique()
        .notNullable()
        .comment("Número de la cuenta de cobro");
      table
        .dateTime("CTC_FECHA_EXPEDICION")
        .notNullable()
        .comment("Fecha de expedición de la cuenta de cobro");
      table
        .dateTime("CTC_FECHA_VENCIMIENTO")
        .notNullable()
        .comment("Fecha de vencimiento");
      table
        .string("CTC_FORMA_PAGO", 15)
        .notNullable()
        .comment("Forma de Pago (Listados Genéricos) (Contado - Crédito)");
      table.decimal("CTC_VALOR", 15, 2).notNullable().comment("Valor a cobrar");
      table
        .string("CTC_CONCEPTO", 500)
        .notNullable()
        .comment("Concepto del cobro");
      table
        .string("CTC_USUARIO_MODIFICO", 15)
        .nullable()
        .comment(
          "Número del documento del último usuario que hizo una modificación"
        );
      table
        .dateTime("CTC_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string("CTC_USUARIO_CREO", 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime("CTC_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creación del registro");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
