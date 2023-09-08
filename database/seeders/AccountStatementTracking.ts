import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AccountStatementTracking from "App/Models/AccountStatementTracking";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AccountStatementTracking.createMany([
      {
        observation: "Without observation",
        statusId: 1,
        accountStatementId: 1,
      },
      {
        observation: "Nothing in the observations",
        statusId: 2,
        accountStatementId: 2,
      },
      {
        observation: "Perhaps some day exists an observation",
        statusId: 3,
        accountStatementId: 3,
      },
    ]);
  }
}
