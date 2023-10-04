import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createFurnitureSchema = schema.create({
  plate: schema.string([rules.required(), rules.trim(), rules.maxLength(15)]),
  description: schema.string([
    rules.required(),
    rules.trim(),
    rules.maxLength(200),
  ]),
  acquisitionDate: schema.date({ format: "sql" }, [rules.required()]),
  equipmentStatus: schema.number([rules.required(), rules.unsigned()]),
  workerId: schema.number([rules.required(), rules.unsigned()]),
  area: schema.number([rules.required(), rules.unsigned()]),
  model: schema.string([rules.required(), rules.trim(), rules.maxLength(20)]),
  brand: schema.string([rules.required(), rules.trim(), rules.maxLength(50)]),
  measure: schema.string([rules.required(), rules.trim(), rules.maxLength(15)]),
  activeOwner: schema.number([rules.required(), rules.unsigned()]),
  observation: schema.string([
    rules.required(),
    rules.trim(),
    rules.maxLength(500),
  ]),
  clerk: schema.number([rules.required(), rules.unsigned()]),
});
