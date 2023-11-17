import { schema } from "@ioc:Adonis/Core/Validator";

export const createFurnitureInventorySchema = schema.create({
  furnitureIds: schema.array().members(schema.number()),
});
