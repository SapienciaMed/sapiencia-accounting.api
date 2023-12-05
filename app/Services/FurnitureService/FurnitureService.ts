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
import FurnitureHistoryRepository from "App/Repositories/FurnitureHistoryRepository";
import FurnitureRepository from "App/Repositories/FurnitureRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  deleteRepetitions,
  getChangesBetweenTwoObjects,
} from "App/Utils/helpers";
import GenericMasterExternalService from "../external/GenericExternalService";
import PayrollExternalService from "../external/PayrollExternalService";
import {
  furnitureXLSXFilePath,
  furnitureXLSXRows,
  furnitureXLSXcolumnNames,
} from "./XLSX";

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
  generateFurnitureXLSX(
    filters: IFiltersFurnitureSchema
  ): Promise<ApiResponse<string>>;
  getFurnitureByPlate(plate: string): Promise<ApiResponse<IFurnitureMutated>>;
  getManyFurnituresByIds(ids: Array<number>): Promise<IFurnitureMutated[]>;
}

export default class FurnitureService implements IFurnitureService {
  constructor(
    private furnitureRepository: FurnitureRepository,
    private payrollExternalService: PayrollExternalService,
    private genericMasterService: GenericMasterExternalService,
    private furnitureHistoryRepository: FurnitureHistoryRepository
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
    let furnituresPromises: Promise<IFurnitureMutated>[] = [];
    let furnituresMutated: IFurnitureMutated[] = [];
    for (let furniture of furnituresFound) {
      const auxFurniturePromise = this.getCompleteFurnitureInfo(furniture);
      furnituresPromises.push(auxFurniturePromise);
    }
    furnituresMutated = await Promise.all(furnituresPromises);
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
    const body = furnitureMutated ?? payload;
    const furnitureFound = await this.furnitureRepository.getFurnitureById(id);
    const { changes, thereAreChanges } = getChangesBetweenTwoObjects(
      furnitureFound,
      body
    );
    let furnitureUpdated: IFurniture = {} as IFurniture;
    if (thereAreChanges) {
      furnitureUpdated = await this.furnitureRepository.updateFurnitureById(
        id,
        body
      );
      await this.furnitureHistoryRepository.createFurnitureHistory({
        changes,
        furnitureId: id,
      });
    }
    return new ApiResponse(furnitureUpdated, EResponseCodes.OK);
  }
  // GENERATE FURNITURE XLSX
  public async generateFurnitureXLSX(filters: IFiltersFurnitureSchema) {
    const furnituresFound = await this.getAllFurnituresPaginated(filters);
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      data: furnitureXLSXRows(furnituresFound),
      filePath: furnitureXLSXFilePath,
      worksheetName: "Activos fijos",
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }
  // GET FURNITURE BY PLATE
  public async getFurnitureByPlate(plate: string) {
    const furnitureFound = await this.furnitureRepository.getFurnitureByPlate(
      plate
    );
    const furnitureJoined = await this.getCompleteFurnitureInfo(furnitureFound);
    return new ApiResponse(furnitureJoined, EResponseCodes.OK);
  }
  // GET MANY FURNITURES BY IDS
  public async getManyFurnituresByIds(ids: Array<number>) {
    const idsCleared = deleteRepetitions(ids);
    const furnituresFound =
      await this.furnitureRepository.getManyFurnituresByIds(idsCleared);
    let furnitureJoinedPromises: Promise<IFurnitureMutated>[] = [];
    for (let furniture of furnituresFound) {
      const furnitureJoined = this.getCompleteFurnitureInfo(furniture);
      furnitureJoinedPromises.push(furnitureJoined);
    }
    return await Promise.all(furnitureJoinedPromises);
  }
}
