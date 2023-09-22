import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IContract,
  IContractPaginateSchema,
  IContractPaginated,
  IContractSchema,
} from "App/Interfaces/Contract";
import ContractRepository from "App/Repositories/ContractRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IContractService {
  createContract(
    payload: IContractSchema
  ): Promise<ApiResponse<Required<IContract>>>;
  getContractPaginated(
    filters: IContractPaginateSchema
  ): Promise<ApiResponse<IPagingData<IContractPaginated>>>;
}

export default class ContractService implements IContractService {
  constructor(private contractRepository: ContractRepository) {}
  // CREATE CONTRACT
  public async createContract(payload: IContractSchema) {
    const newContract = await this.contractRepository.createContract(payload);
    return new ApiResponse(newContract, EResponseCodes.OK);
  }
  // GET CONTARCT PAGINATED
  public async getContractPaginated(filters: IContractPaginateSchema) {
    const contractsFound = await this.contractRepository.getContractPaginated(
      filters
    );
    return new ApiResponse(contractsFound, EResponseCodes.OK);
  }
}
