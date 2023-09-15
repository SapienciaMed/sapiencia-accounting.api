import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Business from "App/Models/Business";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "nit";
    await Business.updateOrCreateMany(uniqueKey, [
      {
        name: "Institución Universitaria Colegio Mayor de Antioquia",
        nit: "890980134",
        address: "Calle 78 N°65-46",
        email: "example@email.com",
        municipalityCode: "396",
        sender: "Rubén Darío Osorio Jiménez",
        chargeSender: "Vicerrector Académico",
        userCreate: "0000-000-000",
        phone: "4445611",
      },
      {
        name: "Institución Universitaria Pascual Bravo",
        nit: "890980153",
        address: "Calle 73 N°73A-226",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Juan Guillermo Rivera Berrío",
        chargeSender: "Vicerrector de Docencia",
        userCreate: "0000-000-000",
        phone: "4480520",
      },
      {
        name: "Instituto Tecnológico Metropolitano",
        nit: "800214750",
        address: "Calle 73 N°76A-354",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Jorge Iván Rios Rivera",
        chargeSender: "Vicerrector de Docencia",
        userCreate: "0000-000-000",
        phone: "4405102",
      },
      {
        name: "DATOLABS S.A.S",
        nit: "901131054",
        address: "CR 39 5A-95 OF 307",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Felipe Alberto López García",
        chargeSender: "Representante Legal",
        userCreate: "0000-000-000",
        phone: "3045637168",
      },
      {
        name: "Museo Casa de la Memoria",
        nit: "900857221",
        address: "CL 51 36 66",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Sandra Patricia Vasquez Arboleda",
        chargeSender: "Subdirectora administrativa y financiera",
        userCreate: "0000-000-000",
        phone: "6045202020",
      },
    ]);
  }
}
