import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createContractSchema = schema.create({
  contractId: schema.string([
    rules.required(),
    rules.trim(),
    rules.maxLength(100),
  ]),
  businessCode: schema.number([rules.required(), rules.unsigned()]),
  creditAccount: schema.string([rules.required(), rules.maxLength(20)]),
  debitAccount: schema.string([rules.required(), rules.maxLength(20)]),
});

export const updateContractSchema = schema.create({
  contractId: schema.string.optional([rules.trim(), rules.maxLength(100)]),
  businessCode: schema.number.optional([rules.unsigned()]),
  creditAccount: schema.string.optional([rules.maxLength(20)]),
  debitAccount: schema.string.optional([rules.maxLength(20)]),
});
