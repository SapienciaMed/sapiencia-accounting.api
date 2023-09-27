import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IContract,
  IContractInfoCleared,
  IContractInfoSelect,
  IContractInfoSelectByNit,
  IContractPaginateSchema,
  IContractPaginated,
  IContractSchema,
  IContractUpdateSchema,
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
  getContractInfoSelect(): Promise<ApiResponse<IContractInfoSelect[]>>;
  getContractById(id: number): Promise<ApiResponse<IContractInfoCleared>>;
  updateContractById(
    id: number,
    payload: IContractUpdateSchema
  ): Promise<ApiResponse<IContractInfoCleared>>;
  deleteContractById(id: number): Promise<ApiResponse<null>>;
  getContractInfoSelectByNit(): Promise<
    ApiResponse<IContractInfoSelectByNit[]>
  >;
}

export default class ContractService implements IContractService {
  constructor(private contractRepository: ContractRepository) {}
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
    return new ApiResponse(contractSerialized, EResponseCodes.OK);
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
  // GET CONTACT INFO SELECT BY NIT
  public async getContractInfoSelectByNit() {
    const contractsFound = await this.contractRepository.getAllContracts();
    const contractSelectInfo = contractsFound.map((contract) => {
      return contract.serialize({
        fields: {
          omit: ["createdAt", "updatedAt", "userCreate", "userModified"],
        },
        relations: {
          business: {
            fields: {
              omit: ["createdAt", "updatedAt", "userCreate", "userModified"],
            },
          },
        },
      }) as IContractInfoSelectByNit;
    });
    const contractSelectInfoMutated = contractSelectInfo.map((contract) => {
      return {
        ...contract,
        name: contract.business.nit,
        value: contract.business.id,
      };
    });
    return new ApiResponse(contractSelectInfoMutated, EResponseCodes.OK);
  }
}
