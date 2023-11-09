import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createContractSchema = schema.create({
  contractId: schema.string([
    rules.trim(),
    rules.required(),
    rules.maxLength(100),
  ]),
  businessCode: schema.number([
    rules.trim(),
    rules.required(),
    rules.unsigned(),
  ]),
  creditAccount: schema.string([
    rules.trim(),
    rules.required(),
    rules.maxLength(20),
  ]),
  debitAccount: schema.string([
    rules.trim(),
    rules.required(),
    rules.maxLength(20),
  ]),
  email: schema.string([rules.trim(), rules.required(), rules.maxLength(50)]),
  sender: schema.string([rules.trim(), rules.required(), rules.maxLength(100)]),
  chargeSender: schema.string([
    rules.trim(),
    rules.required(),
    rules.maxLength(100),
  ]),
});

export const updateContractSchema = schema.create({
  contractId: schema.string.optional([rules.trim(), rules.maxLength(100)]),
  businessCode: schema.number.optional([rules.unsigned()]),
  creditAccount: schema.string.optional([rules.maxLength(20)]),
  debitAccount: schema.string.optional([rules.maxLength(20)]),
  email: schema.string.optional([rules.trim(), rules.maxLength(50)]),
  sender: schema.string.optional([rules.trim(), rules.maxLength(100)]),
  chargeSender: schema.string.optional([rules.trim(), rules.maxLength(100)]),
});
