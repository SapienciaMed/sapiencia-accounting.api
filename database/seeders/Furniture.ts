import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Furniture from "App/Models/Furniture";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "plate";
    await Furniture.updateOrCreateMany(uniqueKey, [
      {
        area: 1, // TI
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "71210748",
        fullName: "EMERSON MACHADO",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2023-07-05"),
        description: "PORTATIL",
        brand: "HP",
        model: "EliteBook 840 G5",
        plate: "63089028",
        activeOwner: 1, // SAPIENCIA,
        observation: "N/A",
        measure: "N/A",
      },
      {
        area: 1, // TI
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "71210748",
        fullName: "EMERSON MACHADO",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2023-02-05"),
        description: "PORTATIL",
        brand: "HP",
        model: "EliteBook 840 G5",
        plate: "9005502839",
        activeOwner: 1, // SAPIENCIA,
        observation: "N/A",
        measure: "N/A",
      },
      {
        area: 13, // CARTERA
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "98522264",
        fullName: "CARLOS EDUARDO LONDOÑO GARCÉS",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2023-12-24"),
        description: "PORTATIL",
        brand: "LENOVO",
        model: "ThinkPad T15p Gen 3",
        plate: "200037560",
        activeOwner: 1, // SAPIENCIA,
        observation: "N/A",
        measure: "N/A",
      },
      {
        area: 1, // PLANEACIÓN
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "71210748",
        fullName: "EMERSON MACHADO",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2023-06-22"),
        description: "PORTATIL",
        brand: "HP",
        model: "EliteBook 840 G5",
        plate: "2000002836",
        activeOwner: 1, // SAPIENCIA,
        observation: "N/A",
        measure: "N/A",
      },
      {
        area: 1, // TI
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "1036621874",
        fullName: "JHON ALEXIS FERLA PEREZ",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2023-06-15"),
        description: "PORTATIL",
        brand: "HP",
        model: "HP Z24I",
        plate: "2000001580",
        activeOwner: 1, // SAPIENCIA,
        observation: "N/A",
        measure: "N/A",
      },
      {
        area: 3, // GEP
        equipmentStatus: 1, // ASIGNADO
        userIdentification: "71729412",
        fullName: "GERMAN AUGUSTO FORERO PELAEZ",
        clerk: 2, // CONTRATISTA
        acquisitionDate: DateTime.fromISO("2013-12-27"),
        description: "ALL-IN-ONE",
        brand: "HP",
        model: "ProOne 600 G1",
        plate: "2000000299",
        activeOwner: 1, // SAPIENCIA,
        observation: "Equipo de @medellín",
        measure: "N/A",
      },
    ]);
  }
}
