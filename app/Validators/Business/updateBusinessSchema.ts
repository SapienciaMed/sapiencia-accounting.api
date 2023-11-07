import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const updateBusinessSchema = schema.create({
  name: schema.string.optional([
    rules.trim(),
    rules.minLength(4),
    rules.maxLength(300),
  ]),
  nit: schema.string.optional([rules.maxLength(15)]),
  address: schema.string.optional([rules.trim(), rules.maxLength(100)]),
  municipalityCode: schema.string.optional([rules.maxLength(10)]),
  phone: schema.string.optional([rules.maxLength(10)]),
});
