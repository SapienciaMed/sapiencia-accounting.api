import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IBusinessGetById,
  IBusinessInfoSelect,
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import BusinessRepository from "App/Repositories/BusinessRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";

export interface IBusinessService {
  createBusiness(
    payload: IBusinessSchema
  ): Promise<ApiResponse<IBusinessSchema>>;
  getBusinessById(id: number): Promise<ApiResponse<IBusinessGetById>>;
  updateBusiness(
    id: number,
    payload: IBusinessUpdateSchema
  ): Promise<ApiResponse<IBusinessSchema>>;
  getAllBusinessInfo(): Promise<ApiResponse<IBusinessInfoSelect[]>>;
}

export default class BusinessService implements IBusinessService {
  constructor(
    private businessRepository: BusinessRepository,
    private genericMasterExternalService: GenericMasterExternalService
  ) {}
  // CREATE BUSINESS
  public async createBusiness(payload: IBusinessSchema) {
    const newBusiness = await this.businessRepository.createBusiness(payload);
    return new ApiResponse(newBusiness, EResponseCodes.OK);
  }
  // GET ALL SELECT BUSINESS
  public async getBusinessById(id: number) {
    const businessFound = (
      await this.businessRepository.getBusinessById(id)
    ).serializeAttributes({
      omit: ["userModified", "updatedAt", "userCreate", "createdAt"],
    }) as IBusinessGetById;
    const { municipalityCode } = businessFound;
    const municipalityName =
      await this.genericMasterExternalService.getMunicipalityNameByItemCode(
        municipalityCode
      );
    const businessMutated = {
      ...businessFound,
      municipality: municipalityName.itemDescription,
    };
    return new ApiResponse(businessMutated, EResponseCodes.OK);
  }
  // UPDATE BUSINESS
  public async updateBusiness(id: number, payload: IBusinessUpdateSchema) {
    const businessUpdated = await this.businessRepository.updateBusiness(
      id,
      payload
    );
    return new ApiResponse(businessUpdated, EResponseCodes.OK);
  }
  // GET ALL BUSINESS INFO TO FILL SELECT
  public async getAllBusinessInfo() {
    const businessInfoSelect =
      await this.businessRepository.getAllBusinessInfo();
    return new ApiResponse(businessInfoSelect, EResponseCodes.OK);
  }
}
