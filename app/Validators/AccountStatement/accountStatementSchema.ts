import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const accountStatementSchema = schema.create({
  contractCode: schema.number([rules.required(), rules.unsigned()]),
  accountNum: schema.number([rules.required(), rules.unsigned()]),
  expeditionDate: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  expirationDate: schema.date(
    {
      format: "sql",
    },
    [rules.required()]
  ),
  paymentType: schema.string([
    rules.required(),
    rules.alphaNum(),
    rules.minLength(1),
    rules.maxLength(15),
    rules.trim(),
  ]),
  valuePay: schema.number([rules.required(), rules.unsigned()]),
  concept: schema.string([
    rules.required(),
    rules.minLength(1),
    rules.maxLength(500),
    rules.trim(),
  ]),
  userCreate: schema.string([
    rules.required(),
    rules.minLength(1),
    rules.maxLength(15),
    rules.trim(),
  ]),
  userModified: schema.string.optional([
    rules.alphaNum(),
    rules.minLength(1),
    rules.maxLength(15),
    rules.trim(),
  ]),
});
