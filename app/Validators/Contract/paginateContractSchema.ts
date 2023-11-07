import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const paginateContractSchema = schema.create({
  id: schema.number.optional([rules.unsigned()]),
  businessCode: schema.number.optional([rules.unsigned()]),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
