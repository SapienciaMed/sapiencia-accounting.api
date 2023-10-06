import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IWorker } from "App/Interfaces/Worker";
import { ApiResponse } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";

export interface IPayrollExternalService {
  getAllWorkers(): Promise<IWorker[]>;
  getWorkerById(id: number): Promise<{ worker: IWorker }>;
  getWorkerByDocument(document: string): Promise<IWorker>;
}

export default class PayrollExternalService implements IPayrollExternalService {
  private apiPayroll: AxiosInstance;
  private baseURL = `${process.env.urlApiPayroll}/api/v1`;
  constructor() {
    this.apiPayroll = axios.create({
      baseURL: this.baseURL,
    });
  }
  // GET ALL WORKERS
  public async getAllWorkers() {
    const endpoint = `/vinculation/worker/get-by-filters`;
    const { data: resp } = await this.apiPayroll.post<ApiResponse<IWorker[]>>(
      endpoint
    );
    return resp.data;
  }
  // GET WORKER BY ID
  public async getWorkerById(id: number) {
    const endpoint = `${this.baseURL}/vinculation/${id}`;
    const { data: resp } = await this.apiPayroll.get<
      ApiResponse<{ worker: IWorker }>
    >(endpoint);
    if (resp.operation.code === EResponseCodes.FAIL) {
      throw new Error(`Empleado con id ${id} no existe`);
    }
    return resp.data;
  }
  // GET WORKER BY DOCUMENT
  public async getWorkerByDocument(document: string) {
    const endpoint = "/vinculation/worker/get-by-filters";
    const body = {
      documentList: [document],
    };
    const { data: resp } = await this.apiPayroll.post<ApiResponse<IWorker[]>>(
      endpoint,
      body
    );
    if (resp.data.length === 0) {
      throw new Error(`No existen usuarios con documento ${document}`);
    }
    return resp.data[0];
  }
}
