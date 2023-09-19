import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const getBusinessPaginatedFiltersSchema = schema.create({
  id: schema.number([rules.required(), rules.unsigned()]),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
