import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "RZO_RAZONES_SOCIALES";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena las razones sociales de personas jurídicas."
      );
      table
        .increments("RZO_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string("RZO_NOMBRE", 300)
        .notNullable()
        .comment("Nombre de la razón social");
      table
        .string("RZO_NIT", 15)
        .unique()
        .notNullable()
        .comment("Número de NIT");
      table.string("RZO_DIRECCION", 100).notNullable().comment("Dirección");
      table
        .string("RZO_CODIGO_MUNICIPIO", 10)
        .notNullable()
        .comment("Código del municipio (Listados Genéricos - sapiencia-core)");
      table
        .string("RZO_USUARIO_MODIFICO", 15)
        .nullable()
        .comment(
          "Número del documento del último usuario que hizo una modificación"
        );
      table
        .dateTime("RZO_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string("RZO_USUARIO_CREO", 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime("RZO_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creación del registro");
      table
        .string("RZO_TELEFONO", 10)
        .notNullable()
        .comment("Teléfono de la razón social");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
