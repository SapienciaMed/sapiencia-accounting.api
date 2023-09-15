import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const getAccountStatementFilteredSchema = schema.create({
  accountNum: schema.number.optional([rules.unsigned()]),
  contractCode: schema.number.optional([rules.unsigned()]),
  nit: schema.string.optional([
    rules.trim(),
    rules.regex(/(^[0-9]+-{1}[0-9]{1})/),
  ]),
  expeditionDate: schema.date.optional(),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
