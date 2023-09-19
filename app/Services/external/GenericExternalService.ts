import { IMunicipality } from "App/Interfaces/GenericMaster";
import { ApiResponse } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";

export interface IGenericMasterExternalService {
  getMunicipalityNameByItemCode(code: string): Promise<IMunicipality>;
}

export default class GenericMasterExternalService
  implements IGenericMasterExternalService
{
  private urlApiCore: AxiosInstance;
  private baseURL = process.env.urlApiCore;
  constructor() {
    this.urlApiCore = axios.create({
      baseURL: this.baseURL,
    });
  }
  public async getMunicipalityNameByItemCode(code: string) {
    const endpoint = `${this.baseURL}/api/v1/generic-list/get-by-grouper/MUNICIPIOS`;
    const { data: resp } = await this.urlApiCore.get<
      ApiResponse<IMunicipality[]>
    >(endpoint);
    const municipalityFound = resp.data.find(({ id }) => String(id) === code);
    if (municipalityFound === undefined) {
      throw new Error(`Municipio con código ${code} no existe`);
    }
    return municipalityFound;
  }
}
