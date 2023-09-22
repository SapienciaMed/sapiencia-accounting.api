import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AccountStatement from "App/Models/AccountStatement";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AccountStatement.createMany([
      {
        contractCode: 1,
        accountNum: 42023,
        expeditionDate: DateTime.fromISO("2023-05-01"),
        expirationDate: DateTime.fromISO("2023-09-02"),
        paymentType: "1",
        valuePay: 226687971,
        concept:
          "Transferencias para los proyectos de funcionamiento de la Agencia Sapiencia, correspondiente al mes de MAYO de 2023.",
        userCreate: "0000 000 000",
      },
      {
        contractCode: 2,
        accountNum: 52023,
        expeditionDate: DateTime.fromISO("2023-01-20"),
        expirationDate: DateTime.fromISO("2023-02-19"),
        paymentType: "2",
        valuePay: 226687971,
        concept:
          "Transferencias para los proyectos de funcionamiento de la Agencia Sapiencia, correspondiente al mes de MAYO de 2023.",
        userCreate: "0000 000 000",
      },
      {
        contractCode: 3,
        accountNum: 62023,
        expeditionDate: DateTime.fromISO("2023-03-28"),
        expirationDate: DateTime.fromISO("2023-02-19"),
        paymentType: "3",
        valuePay: 226687971,
        concept:
          "Transferencias para los proyectos de funcionamiento de la Agencia Sapiencia, correspondiente al mes de MAYO de 2023.",
        userCreate: "0000 000 000",
      },
    ]);
  }
}
