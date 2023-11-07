import { IGenericItem, IMunicipality } from "App/Interfaces/GenericMaster";
import { ApiResponse } from "App/Utils/ApiResponses";
import { getAuthHeaders } from "App/Utils/helpers";
import axios, { AxiosInstance } from "axios";

export interface IGenericMasterExternalService {
  getGenericItemDescriptionByItemCode(
    grouper: string,
    code: number
  ): Promise<IGenericItem>;
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
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  public async getGenericItemDescriptionByItemCode(
    grouper: string,
    code: number
  ) {
    try {
      const endpoint = `${this.baseURL}/api/v1/generic-list/get-by-grouper/${grouper}`;
      const { data: resp } = await this.urlApiCore.get<
        ApiResponse<IGenericItem[]>
      >(endpoint, {
        headers: getAuthHeaders(),
      });
      const dataFound = resp.data.find(
        ({ itemCode }) => itemCode === String(code)
      );
      if (dataFound === undefined) {
        throw new Error(
          `${grouper.toLocaleLowerCase()} con código ${code} no existe`
        );
      }
      return dataFound;
    } catch (err) {
      throw new Error(err?.response?.data?.operation?.message);
    }
  }
  // GET MUNICIPALITY NAME BY ITEM CODE
  public async getMunicipalityNameByItemCode(code: string) {
    try {
      const endpoint = `${this.baseURL}/api/v1/generic-list/get-by-grouper/MUNICIPIOS`;
      const { data: resp } = await this.urlApiCore.get<
        ApiResponse<IMunicipality[]>
      >(endpoint, {
        headers: getAuthHeaders(),
      });
      const municipalityFound = resp.data.find(({ id }) => String(id) === code);
      if (municipalityFound === undefined) {
        throw new Error(`Municipio con código ${code} no existe`);
      }
      return municipalityFound;
    } catch (err) {
      throw new Error(err?.response?.data?.operation?.message);
    }
  }
}
