import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const generateXLSXFurnitureInventorySchema = schema.create({
  furnitureIds: schema.string([
    rules.required(),
    rules.regex(/^\[\d+(,\d+)*\]$/),
  ]),
});
