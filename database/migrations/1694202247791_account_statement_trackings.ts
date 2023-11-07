import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ACCOUNT_STATEMENT_TRACKING_TABLE } from "App/Constants/Tables/AccountStatement/AccountStatementTracking";

export default class extends BaseSchema {
  protected tableName = ACCOUNT_STATEMENT_TRACKING_TABLE.TABLE_NAME;

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena el seguimiento de las cuentas de cobro"
      );
      table
        .increments(ACCOUNT_STATEMENT_TRACKING_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string(ACCOUNT_STATEMENT_TRACKING_TABLE.OBSERVATION, 500)
        .notNullable()
        .comment("Observaciones de cada estado de seguimiento");
      table
        .dateTime(ACCOUNT_STATEMENT_TRACKING_TABLE.TRACKING_DATE)
        .nullable()
        .comment("Fecha de seguimiento de la cuenta de cobro");
      table
        .integer(ACCOUNT_STATEMENT_TRACKING_TABLE.STATUS)
        .notNullable()
        .comment("Código del estado");
      table
        .integer(ACCOUNT_STATEMENT_TRACKING_TABLE.FK_ACCOUNT_STATEMENT)
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
