import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IBusinessSchema } from "App/Interfaces/Business";
import BusinessRepository from "App/Repositories/BusinessRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IBusinessService {
  createBusiness(
    payload: IBusinessSchema
  ): Promise<ApiResponse<IBusinessSchema | undefined>>;
}

export default class BusinessService implements IBusinessService {
  constructor(private businessRepository: BusinessRepository) {}
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    const newBusiness = await this.businessRepository.createBusiness(payload);
    return new ApiResponse(newBusiness, EResponseCodes.OK);
  }
}
