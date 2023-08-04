import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CollectionAccountsValidator {

  /**
   *
   *
   * id?            : number;
     codContract    : number;
     numAccount     : number;
     dateExpedition : DateTime;
     dateExpired    : DateTime;
     paymentType    : string;
     valuePay       : number;
     concept        : string;
     userModified?  : string;
     dateModified?  : DateTime;
     userCreate?    : string;
     dateCreate?    : DateTime;
   *
   *
   */

  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    id             : schema.number.optional(),
    codContract    : schema.number(),
    numAccount     : schema.number(),
    dateExpedition : schema.date(),
    dateExpired    : schema.date(),
    paymentType    : schema.string([rules.maxLength(15)]),
    valuePay       : schema.number(),
    concept        : schema.string([rules.maxLength(500)]),
    userModified   : schema.string.optional([rules.maxLength(15)]),
    userCreate     : schema.string.optional([rules.maxLength(15)])

  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {"err":"error"};
}
