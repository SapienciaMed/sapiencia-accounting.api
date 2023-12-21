import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const filtersFurnitureSchema = schema.create({
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
  plate: schema.string.optional([rules.trim(), rules.maxLength(15)]),
  description: schema.string.optional([rules.trim(), rules.maxLength(200)]),
  acquisitionDate: schema.date.optional(),
  equipmentStatus: schema.number.optional([rules.unsigned()]),
  createdFrom: schema.date.optional(),
  createdUntil: schema.date.optional(),
});
