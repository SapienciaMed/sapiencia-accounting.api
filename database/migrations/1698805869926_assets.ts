import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ASSETS_TABLE } from "App/Constants/Tables/AssetsTable";

export default class extends BaseSchema {
  protected tableName = ASSETS_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los activos a inventariar.");
      table
        .increments(ASSETS_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria.");
      table
        .string(ASSETS_TABLE.TYPE, 10)
        .notNullable()
        .comment("Tipo de activo (Listados Genéricos - TIPO_ACTIVOS)");
      table
        .string(ASSETS_TABLE.CAMPUS, 4)
        .notNullable()
        .comment("Código de la sede (Listados Genéricos - SEDES)");
      table
        .string(ASSETS_TABLE.AREA, 4)
        .notNullable()
        .comment("Código del área (Listados Genéricos - AREA)");
      table
        .string(ASSETS_TABLE.STATUS, 1)
        .notNullable()
        .comment("Estado del equipo (Listados Genéricos - ESTADO_EQUIPO)");
      table
        .string(ASSETS_TABLE.OWNER_ID, 15)
        .notNullable()
        .comment(
          "Número de documento del colaborador a quien se le asignó el activo"
        );
      table
        .date(ASSETS_TABLE.OWNER_DATE)
        .notNullable()
        .comment("Fecha en que se hizo la adquisición del activo");
      table
        .string(ASSETS_TABLE.EQUIPMENT_TYPE, 50)
        .notNullable()
        .comment("Tipo de equipo");
      table
        .string(ASSETS_TABLE.BRAND, 50)
        .notNullable()
        .comment("Marca del equipo");
      table
        .string(ASSETS_TABLE.MODEL, 50)
        .notNullable()
        .comment("Modelo del equipo");
      table
        .string(ASSETS_TABLE.PLATE, 15)
        .notNullable()
        .unique()
        .comment("Placa del equipo (Código de barras)");
      table
        .string(ASSETS_TABLE.SERIAL, 50)
        .notNullable()
        .unique()
        .comment("Serial del equipo");
      table
        .string(ASSETS_TABLE.CPU, 50)
        .nullable()
        .comment("Procesador del equipo de computo");
      table
        .string(ASSETS_TABLE.RAM, 50)
        .nullable()
        .comment("Memoria RAM del equipo de computo");
      table
        .string(ASSETS_TABLE.STORAGE, 50)
        .nullable()
        .comment("Disco duro del equipo de computo");
      table
        .string(ASSETS_TABLE.OS, 50)
        .nullable()
        .comment("Sistema operativo del equipo de computo");
      table
        .string(ASSETS_TABLE.OBSERVATIONS, 500)
        .nullable()
        .comment("Observaciones");
      table
        .string(ASSETS_TABLE.USER_MODIFIED, 15)
        .defaultTo(process.env.CURRENT_USER_DOCUMENT || "")
        .comment(
          "Número del documento del último usuario que hizo una modificación"
        );
      table
        .dateTime(ASSETS_TABLE.UPDATED_AT)
        .notNullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string(ASSETS_TABLE.USER_CREATED, 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime(ASSETS_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha y hora de creación del registro");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
