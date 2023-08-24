import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import BusinessName from 'App/Models/BusinessName';

// id?: number; // RZO_CODIGO
// name: string; // RZO_NOMBRE
// nit: string; // RZO_NIT
// address: string; // RZO_DIRECCION
// email: string; // RZO_CORREO_ELECTRONICO
// municipalityCode: string; // RZO_CODIGO_MUNICIPIO
// sender: string; // RZO_REMISOR
// chargeSender: string; // RZO_CARGO_REMISOR
// userModified?: string; // RZO_USUARIO_MODIFICO
// updatedAt?: DateTime; // RZO_FECHA_MODIFICO
// userCreate: string; // RZO_USUARIO_CREO
// createdAt?: DateTime; // RZO_FECHA_CREO

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "name"
    await BusinessName.updateOrCreateMany(uniqueKey, [
      {
        name: "Institución Universitaria Colegio Mayor de Antioquia",
        nit: "890980134",
        address: "Calle 78 N°65-46",
        email: "example@mail.com",
        municipalityCode: "396",
        sender: "Sindy Escalante",
        chargeSender: "Coordinadora financiera unidad de convenios y contratos",
        userCreate: "0000 000 000"
        // userModified: null,
      }
    ])
  }
}