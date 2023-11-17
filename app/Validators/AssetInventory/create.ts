import { schema } from "@ioc:Adonis/Core/Validator";

export const createAssetInventorySchema = schema.create({
  assetIds: schema.array().members(schema.number()),
});
