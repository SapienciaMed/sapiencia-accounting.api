import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const accountStatementUpdateSchema = schema.create({
  contractCode: schema.number.optional([rules.unsigned()]),
  valuePay: schema.number.optional([rules.unsigned()]),
  concept: schema.string.optional([
    rules.minLength(1),
    rules.maxLength(500),
    rules.trim(),
  ]),
});
