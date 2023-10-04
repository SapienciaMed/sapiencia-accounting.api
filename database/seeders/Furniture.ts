import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Furniture from "App/Models/Furniture";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "plate";
    await Furniture.updateOrCreateMany(uniqueKey, [
      {
        plate: "2000001574",
        description: "MONITOR",
        acquisitionDate: "2023-09-02",
        equipmentStatus: 1,
        userIdentification: 1000914447,
        area: 1,
        fullName: "CRISTINA GARCES ALVAREZ",
        model: "1991- 1",
        measure: "5 x 98",
        activeOwner: "SAPIENCIA",
        observation: "N/A",
        clerk: 2,
      },
    ]);
  }
}
