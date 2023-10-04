import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFurniture, IFurnitureSchema } from "App/Interfaces/Furniture";
import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import FurnitureRepository from "App/Repositories/FurnitureRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import PayrollExternalService from "./external/PayrollExternalService";

export interface IFurnitureService {
  getIdentificationUsersSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  getWorkersFullNameSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  createFurniture(payload: IFurnitureSchema): Promise<ApiResponse<IFurniture>>;
  getFurnitureById(id: number): Promise<ApiResponse<IFurniture>>;
}

export default class FurnitureService implements IFurnitureService {
  constructor(
    private furnitureRepository: FurnitureRepository,
    private payrollExternalService: PayrollExternalService
  ) {}
  // GET IDENTIFICATION USERS SELECT INFO
  public async getIdentificationUsersSelectInfo() {
    const workersFound = await this.payrollExternalService.getAllWorkers();
    const wokersMutated = workersFound.map((worker) => {
      const { id, numberDocument } = worker;
      return {
        value: id,
        name: numberDocument,
      };
    });
    return new ApiResponse(wokersMutated, EResponseCodes.OK);
  }
  // GET WORKERS FULL NAME SELECT INFO
  public async getWorkersFullNameSelectInfo() {
    const workersFound = await this.payrollExternalService.getAllWorkers();
    const wokersMutated = workersFound.map((worker) => {
      const {
        id,
        firstName,
        secondName = "",
        surname,
        secondSurname = "",
      } = worker;
      return {
        value: id,
        name: `${firstName} ${secondName} ${surname} ${secondSurname}`,
      };
    });
    return new ApiResponse(wokersMutated, EResponseCodes.OK);
  }
  // CREATE FURNITURE
  public async createFurniture(payload: IFurnitureSchema) {
    if (!payload?.workerId) throw new Error("workerId is required optional");
    const workerFound = await this.payrollExternalService.getWorkerById(
      payload.workerId
    );
    const {
      firstName,
      secondName = "",
      surname,
      secondSurname = "",
      numberDocument,
    } = workerFound.worker;
    delete payload.workerId;
    const furnitureMutated: IFurniture = {
      ...payload,
      fullName: `${firstName} ${secondName} ${surname} ${secondSurname}`,
      userIdentification: numberDocument,
    };
    const newFurniture = await this.furnitureRepository.createFurniture(
      furnitureMutated
    );
    return new ApiResponse(newFurniture, EResponseCodes.OK);
  }
  // GET FURNITURE BY ID
  public async getFurnitureById(id: number) {
    const furnitureFound = await this.furnitureRepository.getFurnitureById(id);
    return new ApiResponse(furnitureFound, EResponseCodes.OK);
  }
}
