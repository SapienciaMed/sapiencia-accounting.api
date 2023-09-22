import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IContract, IContractSchema } from "App/Interfaces/Contract";
import ContractRepository from "App/Repositories/ContractRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IContractService {
  createContract(
    payload: IContractSchema
  ): Promise<ApiResponse<Required<IContract>>>;
}

export default class ContractService implements IContractService {
  constructor(private contractRepository: ContractRepository) {}
  // CREATE CONTRACT
  public async createContract(payload: IContractSchema) {
    const newContract = await this.contractRepository.createContract(payload);
    return new ApiResponse(newContract, EResponseCodes.OK);
  }
}
