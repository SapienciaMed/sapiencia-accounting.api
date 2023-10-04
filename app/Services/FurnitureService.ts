import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import PayrollExternalService from "./external/PayrollExternalService";

export interface IFurnitureService {
  getIdentificationUsersSelectInfo(): Promise<IWorkerSelectInfo[]>;
  getWorkersFullNameSelectInfo(): Promise<IWorkerSelectInfo[]>;
}

export default class FurnitureService implements IFurnitureService {
  constructor(
    // private furnitureRepository: FurnitureRepository,
    private payrollExternalService: PayrollExternalService
  ) {}
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
}
