import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AccountStatementStatus from "App/Models/AccountStatementStatus";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "status_name";
    await AccountStatementStatus.updateOrCreateMany(uniqueKey, [
      {
        status_name: "Anulada",
      },
      {
        status_name: "Pagada",
      },
      {
        status_name: "Vencida",
      },
    ]);
  }
}
