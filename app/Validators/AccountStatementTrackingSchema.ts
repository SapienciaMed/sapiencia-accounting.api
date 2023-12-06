import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const accountStatementTrackingSchema = schema.create({
  observation: schema.string([
    rules.required(),
    rules.minLength(1),
    rules.maxLength(500),
    rules.trim(),
  ]),
  statusId: schema.number([rules.required(), rules.unsigned()]),
  trackingDate: schema.date.optional(),
});
