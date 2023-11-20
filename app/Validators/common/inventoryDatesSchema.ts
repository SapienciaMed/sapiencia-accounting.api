import { schema } from "@ioc:Adonis/Core/Validator";

export const inventoryDatesSchema = schema.create({
  inventoryDates: schema.array().members(schema.date()),
});
