import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Business from "App/Models/Business";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "nit";
    await Business.updateOrCreateMany(uniqueKey, [
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
  }
}
