import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ParsedTypedSchema, TypedSchema } from "@ioc:Adonis/Core/Validator";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "./ApiResponses";

export const validateSchema = async (
  { request, response, logger }: HttpContextContract,
  schema: ParsedTypedSchema<TypedSchema>
) => {
  try {
    const payload = await request.validate({ schema });
    return payload;
  } catch (err) {
    const validationErrors = err?.messages?.errors;
    logger.error(validationErrors);
    const apiResp = new ApiResponse(
      null,
      EResponseCodes.FAIL,
      JSON.stringify(validationErrors)
    );
    return response.badRequest(apiResp);
  }
};
