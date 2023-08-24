import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'CTR_CONTRATOS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los contratos con las razones sociales");
      table
        .increments('CTR_CODIGO')
        .primary()
        .unique()
        .notNullable()
        .comment('Llave primaria');
      table
        .string("CTR_NUMERO_CONTRATO", 100)
        .notNullable()
        .comment("Número/Identificador del Contrato");
      table
        .integer("CTR_CODRZO_RAZON_SOCIAL")
        .unsigned()
        .references("RZO_CODIGO")
        .inTable("RZO_RAZONES_SOCIALES")
        .notNullable()
        .comment("Código de la razon social (FK RZO_RAZONES_SOCIALES)");
      table
        .string("CTR_USUARIO_MODIFICO", 15)
        .nullable()
        .comment("Número del documento del último usuario que hizo una modificación");
      table
        .dateTime("CTR_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string("CTR_USUARIO_CREO", 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime("CTR_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creación del registro");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
