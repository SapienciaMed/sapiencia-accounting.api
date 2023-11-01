import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createAssetSchema = schema.create({
  type: schema.enum(["Computo", "Otros"], [rules.required()]),
  campus: schema.string([rules.required(), rules.trim(), rules.maxLength(4)]),
  area: schema.string([rules.required(), rules.trim(), rules.maxLength(4)]),
  status: schema.string([rules.required(), rules.trim(), rules.maxLength(1)]),
  ownerId: schema.string([rules.required(), rules.trim(), rules.maxLength(15)]),
  ownerDate: schema.date({}),
  equipmentType: schema.string([
    rules.required(),
    rules.trim(),
    rules.maxLength(50),
  ]),
  brand: schema.string([rules.required(), rules.trim(), rules.maxLength(50)]),
  model: schema.string([rules.required(), rules.trim(), rules.maxLength(50)]),
  plate: schema.string([rules.required(), rules.trim(), rules.maxLength(15)]),
  serial: schema.string([rules.required(), rules.trim(), rules.maxLength(50)]),
  cpu: schema.string.optional([
    rules.requiredWhen("type", "=", "Computo"),
    rules.trim(),
    rules.maxLength(50),
  ]),
  ram: schema.string.optional([
    rules.requiredWhen("type", "=", "Computo"),
    rules.trim(),
    rules.maxLength(50),
  ]),
  storage: schema.string.optional([
    rules.requiredWhen("type", "=", "Computo"),
    rules.trim(),
    rules.maxLength(50),
  ]),
  os: schema.string.optional([
    rules.requiredWhen("type", "=", "Computo"),
    rules.trim(),
    rules.maxLength(50),
  ]),
  observations: schema.string.optional([rules.trim(), rules.maxLength(500)]),
});
