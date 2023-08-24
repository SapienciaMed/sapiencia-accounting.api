import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import AccountStatement from 'App/Models/AccountStatement';
import { DateTime } from 'luxon';

// id?: number; // CTC_CODIGO
// contractCode: number; // CTC_CODCTR_CONTRATO
// accountNum: string; // CTC_NUMERO
// expeditionDate: DateTime; // CTC_FECHA_EXPEDICION
// expirationDate: DateTime; // CTC_FECHA_VENCIMIENTO
// paymentType: string; // CTC_FORMA_PAGO
// valuePay: number; // CTC_VALOR
// concept: string; // CTC_CONCEPTO
// userCreate: string; // CTC_USUARIO_CREO
// userModified?: string; // CTC_USUARIO_MODIFICO
// createdAt?: DateTime; // CTC_FECHA_CREO
// updatedAt?: DateTime; // CTC_FECHA_MODIFICO

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AccountStatement.createMany([
      {
        contractCode: 1,
        accountNum: "037670151721",
        expeditionDate: DateTime.fromISO("2023-05-05"),
        expirationDate: DateTime.fromISO("2023-06-04"),
        paymentType: "03",
        valuePay: 226687971,
        concept: "Transferencias para los proyectos de funcionamiento de la Agencia Sapiencia, correspondiente al mes de MAYO de 2023.",
        userCreate: "0000 000 000"
        // userModified: null,
      }
    ])
  }
}