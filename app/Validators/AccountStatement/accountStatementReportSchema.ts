import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const accountStatementCausationReportSchema = schema.create({
  expeditionDateFrom: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  expeditionDateUntil: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});

export const accountStatementPaymentReportSchema = schema.create({
  paymentDateFrom: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  paymentDateUntil: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});

export const accountStatementDefeatedPortfolioReportSchema = schema.create({
  statusId: schema.number([rules.required(), rules.unsigned()]),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
