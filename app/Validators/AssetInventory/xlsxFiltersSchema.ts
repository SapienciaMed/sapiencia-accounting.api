import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const generateXLSXAssetInventorySchema = schema.create({
  assetIds: schema.string([rules.required(), rules.regex(/^\[\d+(,\d+)*\]$/)]),
});
