import { IWorker } from "App/Interfaces/Worker";
import { ApiResponse } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";

export interface IPayrollExternalService {
  getAllWorkers(): Promise<IWorker[]>;
}

export default class PayrollExternalService implements IPayrollExternalService {
  private apiPayroll: AxiosInstance;
  private baseURL = process.env.urlApiPayroll;
  constructor() {
    this.apiPayroll = axios.create({
      baseURL: this.baseURL,
    });
  }
  public async getAllWorkers() {
    const endpoint = `${this.baseURL}/api/v1/vinculation/worker`;
    const { data: resp } = await this.apiPayroll.get<ApiResponse<IWorker[]>>(
      endpoint
    );
    return resp.data;
  }
}
