import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createBusinessSchema = schema.create({
  name: schema.string([
    rules.required(),
    rules.trim(),
    rules.minLength(4),
    rules.maxLength(300),
  ]),
  nit: schema.string([rules.required(), rules.maxLength(15)]),
  address: schema.string([
    rules.required(),
    rules.trim(),
    rules.maxLength(100),
  ]),
  municipalityCode: schema.string([rules.required(), rules.maxLength(10)]),
  phone: schema.string([rules.required(), rules.maxLength(10)]),
});
