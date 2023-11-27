import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const inventoryDatesSchema = schema.create({
  inventoryDates: schema.string([
    rules.required(),
    rules.regex(/^\["(\d{4}-\d{2}-\d{2}"(,"\d{4}-\d{2}-\d{2}")*)?\]$/),
  ]),
});
