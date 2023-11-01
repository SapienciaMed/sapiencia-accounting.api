import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const updateAssetSchema = schema.create({
  type: schema.enum.optional(["Computo", "Otros"], [rules.required()]),
  campus: schema.string.optional([rules.trim(), rules.maxLength(4)]),
  area: schema.string.optional([rules.trim(), rules.maxLength(4)]),
  status: schema.string.optional([rules.trim(), rules.maxLength(1)]),
  ownerId: schema.string.optional([rules.trim(), rules.maxLength(15)]),
  ownerDate: schema.date.optional({ format: "iso" }),
  equipmentType: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  brand: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  model: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  cpu: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  ram: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  storage: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  os: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  observations: schema.string.optional([rules.trim(), rules.maxLength(500)]),
});
