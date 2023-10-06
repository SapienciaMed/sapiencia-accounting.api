import { GENERIC_LIST } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IFiltersFurnitureSchema,
  IFurniture,
  IFurnitureMutated,
  IFurnitureRaw,
  IFurnitureSchema,
  IUpdateFurniture,
  IUpdateFurnitureSchema,
} from "App/Interfaces/Furniture";
import { IWorker, IWorkerSelectInfo } from "App/Interfaces/Worker";
import FurnitureRepository from "App/Repositories/FurnitureRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import GenericMasterExternalService from "./external/GenericExternalService";
import PayrollExternalService from "./external/PayrollExternalService";

export interface IFurnitureService {
  getIdentificationUsersSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  getWorkersFullNameSelectInfo(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  createFurniture(payload: IFurnitureSchema): Promise<ApiResponse<IFurniture>>;
  getFurnitureById(id: number): Promise<ApiResponse<IFurnitureMutated>>;
  getFurnitureByIdRaw(id: number): Promise<ApiResponse<IFurnitureRaw>>;
  getAllFurnituresPaginated(
    payload: IFiltersFurnitureSchema
  ): Promise<ApiResponse<IPagingData<IFurnitureMutated>>>;
  getCompleteFurnitureInfo(furniture: IFurniture): Promise<IFurnitureMutated>;
  getCompleteWorkerInfo(id: number): Promise<IWorker>;
  updateFurnitureById(
    id: number,
    payload: IUpdateFurnitureSchema
  ): Promise<ApiResponse<IFurniture>>;
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
    console.log(workerFound);
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
  // GET COMPLETE FURNITURE INFO
  public async getCompleteFurnitureInfo(furniture: IFurniture) {
    const { area, equipmentStatus, activeOwner, clerk } = furniture;
    const areaPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.AREA,
        area
      );
    const equipmentStatusPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.EQUIPMENT_STATUS,
        equipmentStatus
      );
    const activeOwnerPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.ACTIVE_OWNER,
        activeOwner
      );
    const clerkPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.CLERK,
        clerk
      );
    const [areaItem, equipmentStatusItem, activeOwnerItem, clerkItem] =
      await Promise.all([
        areaPromise,
        equipmentStatusPromise,
        activeOwnerPromise,
        clerkPromise,
      ]);
    const furnitureMutated = {
      ...furniture,
      area: areaItem.itemDescription,
      equipmentStatus: equipmentStatusItem.itemDescription,
      activeOwner: activeOwnerItem.itemDescription,
      clerk: clerkItem.itemDescription,
    };
    return furnitureMutated;
  }
  // GET FURNITURE BY ID
  public async getFurnitureById(id: number) {
    const furnitureFound = await this.furnitureRepository.getFurnitureById(id);
    const furnitureMutated = await this.getCompleteFurnitureInfo(
      furnitureFound.serializeAttributes() as IFurniture
    );
    return new ApiResponse(furnitureMutated, EResponseCodes.OK);
  }
  // GET FURNITURE BY ID
  public async getFurnitureByIdRaw(id: number) {
    const furnitureFound = await this.furnitureRepository.getFurnitureById(id);
    const furnitureSerialized =
      furnitureFound.serializeAttributes() as IFurnitureRaw;
    const { id: workerId } =
      await this.payrollExternalService.getWorkerByDocument(
        furnitureFound.userIdentification
      );
    const furnitureMutated = {
      ...furnitureSerialized,
      workerId,
    };
    delete furnitureMutated.fullName;
    delete furnitureMutated.userIdentification;
    return new ApiResponse(furnitureMutated, EResponseCodes.OK);
  }
  // GET ALL FURNITURES PAGINATED
  public async getAllFurnituresPaginated(payload: IFiltersFurnitureSchema) {
    const { array: furnituresFound, meta } =
      await this.furnitureRepository.getAllFurnituresPaginated(payload);
    let furnituresMutated: IFurnitureMutated[] = [];
    for (let furniture of furnituresFound) {
      const auxFurniture = await this.getCompleteFurnitureInfo(furniture);
      furnituresMutated.push(auxFurniture);
    }
    return new ApiResponse(
      { array: furnituresMutated, meta },
      EResponseCodes.OK
    );
  }
  // GET COMPLETE WORKER INFO
  public async getCompleteWorkerInfo(id: number) {
    const { worker } = await this.payrollExternalService.getWorkerById(id);
    const {
      firstName,
      secondName = "",
      surname,
      secondSurname = "",
      numberDocument,
    } = worker;
    return {
      ...worker,
      fullName: `${firstName} ${secondName} ${surname} ${secondSurname}`,
      userIdentification: numberDocument,
    };
  }
  // UPDATE FURNITURE BY ID
  public async updateFurnitureById(
    id: number,
    payload: IUpdateFurnitureSchema
  ) {
    let furnitureMutated: IUpdateFurniture | null = null;
    if (payload?.workerId) {
      const { fullName, userIdentification } = await this.getCompleteWorkerInfo(
        payload.workerId
      );
      delete payload.workerId;
      furnitureMutated = {
        ...payload,
        fullName,
        userIdentification,
      };
    }
    const furnitureUpdated = await this.furnitureRepository.updateFurnitureById(
      id,
      furnitureMutated ?? payload
    );
    return new ApiResponse(furnitureUpdated, EResponseCodes.OK);
  }
}
