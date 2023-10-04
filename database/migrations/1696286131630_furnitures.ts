import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "BIE_BIENES_INMUEBLE";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los bienes inmuebles y su respectivo manejo."
      );
      table
        .increments("BIE_CODIGO")
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria.");
      table
        .string("BIE_PLACA_ACTIVO", 15)
        .unique()
        .notNullable()
        .comment("Valor que indica la placa del bien inmueble.");
      table
        .string("BIE_TIPO_ACTIVO_DESCRIPCION", 200)
        .notNullable()
        .comment("Valor que indica el tipo de activo / descripción.");
      table
        .dateTime("BIE_FECHA_ADQUISICION")
        .notNullable()
        .comment("Fecha de adquisición del bien inmueble.");
      table
        .integer("BIE_ESTADO_EQUIPO")
        .notNullable()
        .unsigned()
        .comment(
          "Estado del equipo: Asignado, Disponible, De baja (Listados Genéricos - sapiencia-core)"
        );
      table
        .string("BIE_CC_USUARIO", 15)
        .notNullable()
        .comment("Cédula del usuario");
      table
        .integer("BIE_AREA")
        .notNullable()
        .unsigned()
        .comment("Área (Listados Genéricos - sapiencia-core)");
      table
        .string("BIE_NOMBRE_APELLIDO", 50)
        .notNullable()
        .comment("Nombre y apellidos del usuario asignado.");
      table
        .string("BIE_MODELO", 50)
        .notNullable()
        .comment("Modelo del bien inmueble.");
      table
        .string("BIE_MARCA", 50)
        .notNullable()
        .comment("Modelo del bien inmueble.");
      table
        .string("BIE_MEDIDAS", 20)
        .notNullable()
        .comment("Medidas del modelo.");
      table
        .integer("BIE_PROPIETARIO_ACTIVO")
        .notNullable()
        .unsigned()
        .comment("Propietario activo del inmueble.");
      table
        .string("BIE_OBSERVACION", 500)
        .notNullable()
        .comment("Observación de la gestión del inmueble.");
      table
        .integer("BIE_FUNCIONARIO")
        .notNullable()
        .comment("Funcionario del bien inmueble");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
