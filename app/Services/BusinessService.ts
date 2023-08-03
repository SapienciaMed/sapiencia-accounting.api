import { IBusiness } from "App/Interfaces/BusinessInterfaces";
import { IBusinessRepository } from "App/Repositories/BusinessRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IBusinessService {
  getBusinessById(id: number): Promise<ApiResponse<IBusiness>>;
}

export default class BusinessService implements IBusinessService {
  constructor(private businessRepository: IBusinessRepository) {}

  async getBusinessById(id: number): Promise<ApiResponse<IBusiness>> {
    const res = await this.businessRepository.getBusinessById(id);

    if (!res) {
      return new ApiResponse(
        {} as IBusiness,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}
