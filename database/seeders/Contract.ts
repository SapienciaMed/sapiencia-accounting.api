import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Contract from "App/Models/Contract";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "contractId";
    await Contract.updateOrCreateMany(uniqueKey, [
      {
        contractId: "PAC ENERO 2023",
        businessCode: 1,
        // userModified: null,
        userCreate: "0000 000 000",
      },
      {
        contractId: "338",
        businessCode: 2,
        // userModified: null,
        userCreate: "0000 000 000",
      },
      {
        contractId: "328",
        businessCode: 3,
        // userModified: null,
        userCreate: "0000 000 000",
      },
    ]);
  }
}
