import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Business from "App/Models/Business";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "name";
    await Business.updateOrCreateMany(uniqueKey, [
      {
        name: "Institución Universitaria Colegio Mayor de Antioquia",
        nit: "890980134",
        address: "Calle 78 N°65-46",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Sindy Escalante",
        chargeSender: "Coordinadora financiera unidad de convenios y contratos",
        userCreate: "0000 000 000",
        // userModified: null,
      },
      {
        name: "Instituto Tecnológico Metropolitano",
        nit: "800214750",
        address: "Calle 73 N°76A-354",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Sindy Escalante",
        chargeSender: "Coordinadora financiera unidad de convenios y contratos",
        userCreate: "0000 000 000",
        // userModified: null,
      },
      {
        name: "DATOLABS S.A.S",
        nit: "901131054",
        address: "CR 39 5A-95 OF 307",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Sindy Escalante",
        chargeSender: "Coordinadora financiera unidad de convenios y contratos",
        userCreate: "0000 000 000",
        // userModified: null,
      },
    ]);
  }
}
