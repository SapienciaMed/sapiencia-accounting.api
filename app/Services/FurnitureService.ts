import { IFurniture, IFurnitureSchema } from "App/Interfaces/Furniture";
import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import FurnitureRepository from "App/Repositories/FurnitureRepository";
import PayrollExternalService from "./external/PayrollExternalService";

export interface IFurnitureService {
  getIdentificationUsersSelectInfo(): Promise<IWorkerSelectInfo[]>;
  getWorkersFullNameSelectInfo(): Promise<IWorkerSelectInfo[]>;
  createFurniture(payload: IFurnitureSchema): Promise<IFurniture>;
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
    return wokersMutated;
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
    return wokersMutated;
  }
  // CREATE FURNITURE
  public async createFurniture(payload: IFurnitureSchema) {
    delete payload.workerId;
    const newFurniture: IFurniture = {
      ...payload,
      fullName: "Foo Bar",
      userIdentification: "109283428672",
    };
    console.log({ newFurniture });
    return await this.furnitureRepository.createFurniture(newFurniture);
  }
}
