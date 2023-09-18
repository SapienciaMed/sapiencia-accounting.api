import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import BusinessRepository from "App/Repositories/BusinessRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IBusinessService {
  createBusiness(
    payload: IBusinessSchema
  ): Promise<ApiResponse<IBusinessSchema | undefined>>;
  getAllBusiness(): Promise<ApiResponse<IBusinessSchema[]>>;
  updateBusiness(
    id: number,
    payload: IBusinessUpdateSchema
  ): Promise<ApiResponse<IBusinessSchema | undefined>>;
}

export default class BusinessService implements IBusinessService {
  constructor(private businessRepository: BusinessRepository) {}
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    const newBusiness = await this.businessRepository.createBusiness(payload);
    return new ApiResponse(newBusiness, EResponseCodes.OK);
  }
  // GET ALL SELECT BUSINESS
  public async getAllBusiness() {
    const businessesFound = await this.businessRepository.getAllBusiness();
    return new ApiResponse(businessesFound, EResponseCodes.OK);
  }
  // UPDATE BUSINESS
  public async updateBusiness(id: number, payload: IBusinessUpdateSchema) {
    const businessUpdated = await this.businessRepository.updateBusiness(
      id,
      payload
    );
    return new ApiResponse(businessUpdated, EResponseCodes.OK);
  }
}
