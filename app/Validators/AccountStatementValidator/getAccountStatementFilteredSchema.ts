import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const getAccountStatementFilteredSchema = schema.create({
  accountNum: schema.number.optional([rules.unsigned()]),
  contractCode: schema.number.optional([rules.unsigned()]),
  nit: schema.string.optional([
    rules.minLength(1),
    rules.maxLength(15),
    rules.alphaNum(),
    rules.trim(),
  ]),
  expeditionDate: schema.date.optional(),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
