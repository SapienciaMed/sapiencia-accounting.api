import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const accountStatementDownloadPDFSchema = schema.create({
  responsive: schema.boolean([rules.required()]),
});
