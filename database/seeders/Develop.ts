import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AccountStatement from "App/Models/AccountStatement";
import AccountStatementTracking from "App/Models/AccountStatementTracking";
import Business from "App/Models/Business";
import Contract from "App/Models/Contract";
import { DateTime } from "luxon";

enum TABLE_KEYS {
  BUSINESS = "nit",
  CONTRACT = "contractId",
}

export default class extends BaseSeeder {
  public async run() {
    await Business.updateOrCreateMany(TABLE_KEYS.BUSINESS, [
      {
        name: "Institución Universitaria Colegio Mayor de Antioquia",
        nit: "890980134-1",
        address: "Calle 78 N°65-46",
        municipalityCode: "396",
        userCreate: "0000-000-000",
        phone: "4445611",
      },
      {
        name: "Institución Universitaria Pascual Bravo",
        nit: "890980153-1",
        address: "Calle 73 N°73A-226",
        municipalityCode: "396",
        userCreate: "0000-000-000",
        phone: "4480520",
      },
      {
        name: "Instituto Tecnológico Metropolitano",
        nit: "800214750-1",
        address: "Calle 73 N°76A-354",
        municipalityCode: "396",
        userCreate: "0000-000-000",
        phone: "4405102",
      },
      {
        name: "DATOLABS S.A.S",
        nit: "901131054-1",
        address: "CR 39 5A-95 OF 307",
        municipalityCode: "396",
        userCreate: "0000-000-000",
        phone: "3045637168",
      },
      {
        name: "Museo Casa de la Memoria",
        nit: "900857221-1",
        address: "CL 51 36 66",
        municipalityCode: "396",
        userCreate: "0000-000-000",
        phone: "6045202020",
      },
    ]);
    await Contract.updateOrCreateMany(TABLE_KEYS.CONTRACT, [
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
    await AccountStatementTracking.createMany([
      {
        observation: "Without observation",
        statusId: 1,
        accountStatementId: 1,
      },
      {
        observation: "Nothing in the observations",
        statusId: 2,
        trackingDate: DateTime.fromISO("2023-02-19"),
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
