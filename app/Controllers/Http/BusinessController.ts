import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BusinessProvider from "@ioc:core.BusinessProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class BusinessController {
  public async getBusinessById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await BusinessProvider.getBusinessById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
