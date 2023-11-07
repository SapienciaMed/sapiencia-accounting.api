import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import FurnitureHistory from "App/Models/FutnitureHistory";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await FurnitureHistory.createMany([
      // {
      //   changes: {
      //     oldChanges: {
      //       area: 1,
      //       model: "EliteBook 840 G5",
      //     },
      //     newChanges: {
      //       area: 2,
      //       model: "EliteBook 840 G5S",
      //     },
      //   },
      //   furnitureId: 1,
      // },
    ]);
  }
}
