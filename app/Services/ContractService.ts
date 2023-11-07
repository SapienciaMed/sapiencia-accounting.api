import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IContract,
  IContractInfoCleared,
  IContractInfoSelect,
  IContractPaginateSchema,
  IContractPaginated,
  IContractSchema,
  IContractUpdateSchema,
} from "App/Interfaces/Contract";
import ContractRepository from "App/Repositories/ContractRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";

export interface IContractService {
  createContract(
    payload: IContractSchema
  ): Promise<ApiResponse<Required<IContract>>>;
  getContractPaginated(
    filters: IContractPaginateSchema
  ): Promise<ApiResponse<IPagingData<IContractPaginated>>>;
  getContractInfoSelect(): Promise<ApiResponse<IContractInfoSelect[]>>;
  getContractById(id: number): Promise<ApiResponse<IContractInfoCleared>>;
  updateContractById(
    id: number,
    payload: IContractUpdateSchema
  ): Promise<ApiResponse<IContractInfoCleared>>;
  deleteContractById(id: number): Promise<ApiResponse<null>>;
}

export default class ContractService implements IContractService {
  constructor(
    private contractRepository: ContractRepository,
    private genericMasterExternalService: GenericMasterExternalService
  ) {}
  // CREATE CONTRACT
  public async createContract(payload: IContractSchema) {
    const newContract = await this.contractRepository.createContract(payload);
    return new ApiResponse(newContract, EResponseCodes.OK);
  }
  // GET CONTRACT PAGINATED
  public async getContractPaginated(filters: IContractPaginateSchema) {
    const contractsFound = await this.contractRepository.getContractPaginated(
      filters
    );
    return new ApiResponse(contractsFound, EResponseCodes.OK);
  }
  // GET CONTRACT INFO SELECT
  public async getContractInfoSelect() {
    const contractsFound =
      await this.contractRepository.getContractInfoSelect();
    const contractsFoundMutated = contractsFound.map((contract) => {
      const { id, contractId, business } = contract;
      return {
        value: id,
        name: contractId,
        data: business,
      };
    });
    return new ApiResponse(contractsFoundMutated, EResponseCodes.OK);
  }
  // GET CONTRACT BY ID
  public async getContractById(id: number) {
    const contractFound = await this.contractRepository.getContractById(id);
    const contractSerialized = contractFound.serialize({
      fields: {
        omit: ["userModified", "userCreate", "createdAt", "updatedAt"],
      },
      relations: {
        business: {
          fields: {
            omit: ["createdAt", "updatedAt", "userModified", "userCreate"],
          },
        },
      },
    }) as IContractInfoCleared;
    const { municipalityCode } = contractSerialized.business;
    const municipalityName =
      await this.genericMasterExternalService.getMunicipalityNameByItemCode(
        municipalityCode
      );
    const contractSerializedMutated = {
      ...contractSerialized,
      business: {
        ...contractSerialized.business,
        municipality: municipalityName.itemDescription,
      },
    };
    return new ApiResponse(contractSerializedMutated, EResponseCodes.OK);
  }
  // UPDATE CONTRACT BY ID
  public async updateContractById(id: number, payload: IContractUpdateSchema) {
    const newContract = await this.contractRepository.updateContractById(
      id,
      payload
    );
    const contractSerialized = newContract.serializeAttributes({
      omit: ["userModified", "createdAt", "updatedAt", "userCreate"],
    }) as IContractInfoCleared;
    return new ApiResponse(contractSerialized, EResponseCodes.OK);
  }
  // DELETE CONTRACT BY ID
  public async deleteContractById(id: number) {
    await this.contractRepository.deleteContractById(id);
    return new ApiResponse(null, EResponseCodes.OK);
  }
}
