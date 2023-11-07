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
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
      },
      {
        contractId: "338",
        businessCode: 2,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
      },
      {
        contractId: "89",
        businessCode: 3,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
      },
      {
        contractId: "12",
        businessCode: 4,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
      },
      {
        contractId: "300",
        businessCode: 5,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
      },
    ]);
  }
}
