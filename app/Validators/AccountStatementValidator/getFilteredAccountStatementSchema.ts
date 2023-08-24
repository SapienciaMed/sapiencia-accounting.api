import { rules, schema } from '@ioc:Adonis/Core/Validator';

export const getFilteredAccountStatementSchema = schema.create({
    accountNum: schema.number.optional([
        rules.unsigned(),
    ]),
    contractCode: schema.number.optional([
        rules.unsigned(),
    ]),
    nit: schema.string.optional([
        rules.minLength(1),
        rules.maxLength(15),
        rules.alphaNum(),
        rules.trim()
    ]),
    expirationDate: schema.date.optional({
        format: "sql"
    }),
})