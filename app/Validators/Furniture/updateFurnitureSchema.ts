import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const updateFurnitureSchema = schema.create({
  description: schema.string.optional([rules.trim(), rules.maxLength(200)]),
  acquisitionDate: schema.date.optional(),
  equipmentStatus: schema.number.optional([rules.unsigned()]),
  workerId: schema.number.optional([rules.unsigned()]),
  area: schema.number.optional([rules.unsigned()]),
  model: schema.string.optional([rules.trim(), rules.maxLength(20)]),
  brand: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  measure: schema.string.optional([rules.trim(), rules.maxLength(15)]),
  activeOwner: schema.number.optional([rules.unsigned()]),
  observation: schema.string.optional([rules.trim(), rules.maxLength(500)]),
  clerk: schema.number.optional([rules.unsigned()]),
});
