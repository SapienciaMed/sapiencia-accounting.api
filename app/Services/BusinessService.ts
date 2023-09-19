import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IBusinessGetById,
  IBusinessInfoSelect,
  IBusinessPaginateFilters,
  IBusinessSchema,
  IBusinessUpdateSchema,
} from "App/Interfaces/Business";
import BusinessRepository from "App/Repositories/BusinessRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
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
  getBusinessPaginated(
    filters: IBusinessPaginateFilters
  ): Promise<ApiResponse<IPagingData<IBusinessSchema>>>;
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
  // GET ALL BUSINESSES FILTERED
  public async getBusinessPaginated(filters: IBusinessPaginateFilters) {
    const businessFound = await this.businessRepository.getBusinessPaginated(
      filters
    );
    // if (businessFound.array.length !== 0) {
    //   const [business] = businessFound.array;
    //   const { municipalityCode } = business;
    //   const municipalityName =
    //     await this.genericMasterExternalService.getMunicipalityNameByItemCode(
    //       municipalityCode
    //     );
    //   const businessMutated = {
    //     ...business,
    //     municipality: municipalityName.itemDescription,
    //   };
    //   return [{ ...businessFound, array: { ...businessMutated } }];
    // }
    return new ApiResponse(businessFound, EResponseCodes.OK);
  }
}
