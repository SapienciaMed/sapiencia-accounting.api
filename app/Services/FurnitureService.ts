import { GENERIC_LIST } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFurniture,
  IFurnitureMutated,
  IFurnitureSchema,
} from "App/Interfaces/Furniture";
import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import FurnitureRepository from "App/Repositories/FurnitureRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";
import PayrollExternalService from "./external/PayrollExternalService";

export interface IFurnitureService {
  getIdentificationUsersSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  getWorkersFullNameSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  createFurniture(payload: IFurnitureSchema): Promise<ApiResponse<IFurniture>>;
  getFurnitureById(id: number): Promise<ApiResponse<IFurnitureMutated>>;
}

export default class FurnitureService implements IFurnitureService {
  constructor(
    private furnitureRepository: FurnitureRepository,
    private payrollExternalService: PayrollExternalService,
    private genericMasterService: GenericMasterExternalService
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
    const { area, equipmentStatus, activeOwner, clerk } = furnitureFound;
    const { itemDescription: areaName } =
      await this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.AREA,
        area
      );
    const { itemDescription: equipmentStatusName } =
      await this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.EQUIPMENT_STATUS,
        equipmentStatus
      );
    const { itemDescription: activeOwnerName } =
      await this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.ACTIVE_OWNER,
        activeOwner
      );
    const { itemDescription: clerkName } =
      await this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.CLERK,
        clerk
      );
    const furnitureMutated = {
      ...furnitureFound,
      area: areaName,
      equipmentStatus: equipmentStatusName,
      activeOwner: activeOwnerName,
      clerk: clerkName,
    };
    return new ApiResponse(furnitureMutated, EResponseCodes.OK);
  }
}
