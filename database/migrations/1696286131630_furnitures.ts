import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { FURNITURE_TABLE } from "App/Constants/Tables/Furniture/FurnitureTable";

export default class extends BaseSchema {
  protected tableName = FURNITURE_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los bienes inmuebles y su respectivo manejo."
      );
      table
        .increments(FURNITURE_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria.");
      table
        .string(FURNITURE_TABLE.PLATE, 50)
        .unique()
        .notNullable()
        .comment("Valor que indica la placa del bien inmueble.");
      table
        .string(FURNITURE_TABLE.DESCRIPTION, 200)
        .notNullable()
        .comment("Valor que indica el tipo de activo / descripción.");
      table
        .dateTime(FURNITURE_TABLE.ACQUISITION_DATE)
        .notNullable()
        .comment("Fecha de adquisición del bien inmueble.");
      table
        .integer(FURNITURE_TABLE.EQUIPMENT_STATUS)
        .notNullable()
        .unsigned()
        .comment(
          "Estado del equipo: Asignado, Disponible, De baja (Listados Genéricos - sapiencia-core)"
        );
      table
        .string(FURNITURE_TABLE.OWNER_ID, 15)
        .notNullable()
        .comment("Cédula del usuario");
      table
        .integer(FURNITURE_TABLE.AREA)
        .notNullable()
        .unsigned()
        .comment("Área (Listados Genéricos - sapiencia-core)");
      table
        .string(FURNITURE_TABLE.OWNER_FULL_NAME, 50)
        .notNullable()
        .comment("Nombre y apellidos del usuario asignado.");
      table
        .string(FURNITURE_TABLE.MODEL, 50)
        .notNullable()
        .comment("Modelo del bien inmueble.");
      table
        .string(FURNITURE_TABLE.BRAND, 50)
        .notNullable()
        .comment("Marca del bien inmueble.");
      table
        .string(FURNITURE_TABLE.MEASURE, 50)
        .notNullable()
        .comment("Medidas del modelo.");
      table
        .integer(FURNITURE_TABLE.ACTIVE_OWNER)
        .notNullable()
        .unsigned()
        .comment("Propietario activo del inmueble.");
      table
        .string(FURNITURE_TABLE.OBSERVATIONS, 500)
        .notNullable()
        .comment("Observación de la gestión del inmueble.");
      table
        .integer(FURNITURE_TABLE.CLERK)
        .notNullable()
        .comment("Funcionario del bien inmueble");
      table
        .dateTime(FURNITURE_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha y hora de creación del registro");
      table
        .dateTime(FURNITURE_TABLE.UPDATED_AT)
        .nullable()
        .comment("Fecha y hora de la última modificación");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
