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
        email: "example@email.com",
        sender: "Rubén Darío Osorio Jiménez",
        chargeSender: "Vicerrector Académico",
      },
      {
        contractId: "338",
        businessCode: 2,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
        email: "example@mail.com",
        sender: "Juan Guillermo Rivera Berrío",
        chargeSender: "Vicerrector de Docencia",
      },
      {
        contractId: "89",
        businessCode: 3,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
        email: "example@mail.com",
        sender: "Jorge Iván Rios Rivera",
        chargeSender: "Vicerrector de Docencia",
      },
      {
        contractId: "12",
        businessCode: 4,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
        email: "example@mail.com",
        sender: "Felipe Alberto López García",
        chargeSender: "Representante Legal",
      },
      {
        contractId: "300",
        businessCode: 5,
        userCreate: "0000 000 000",
        creditAccount: "037670151721",
        debitAccount: "037670151721",
        email: "example@mail.com",
        sender: "Sandra Patricia Vasquez Arboleda",
        chargeSender: "Subdirectora administrativa y financiera",
      },
    ]);
  }
}
