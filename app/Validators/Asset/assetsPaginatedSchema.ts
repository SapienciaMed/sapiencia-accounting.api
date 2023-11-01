import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const assetsPaginatedSchema = schema.create({
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
  type: schema.enum.optional(["Computo", "Otros"]),
  campus: schema.string.optional([rules.trim(), rules.maxLength(4)]),
  ownerId: schema.string.optional([rules.trim(), rules.maxLength(15)]),
  plate: schema.string.optional([rules.trim(), rules.maxLength(15)]),
  serial: schema.string.optional([rules.trim(), rules.maxLength(50)]),
});
