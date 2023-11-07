import { TIPO_ACTIVOS } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAsset,
  IAssetSchema,
  IAssetsFilters,
  IUpdateAssetSchema,
} from "App/Interfaces/Asset";
import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import AssetHistoryRepository from "App/Repositories/AssetHistoryRepository";
import AssetRepository from "App/Repositories/AssetRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import { getChangesBetweenTwoObjects } from "App/Utils/helpers";
import PayrollExternalService from "../external/PayrollExternalService";
import { assetXLSXFilePath, assetXLSXRows, assetXLSXcolumnNames } from "./XLSX";

export interface IAssetService {
  createAsset(payload: IAssetSchema): Promise<ApiResponse<IAsset>>;
  getAllAssetsPaginated(
    filters: IAssetsFilters
  ): Promise<ApiResponse<IPagingData<IAsset>>>;
  generateAssetXLSX(filters: IAssetsFilters): Promise<ApiResponse<string>>;
  getAssetById(id: number): Promise<ApiResponse<IAsset>>;
  updateAssetById(
    id: number,
    payload: IUpdateAssetSchema
  ): Promise<ApiResponse<IAsset>>;
  getWorkersInfoSelect(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
}

export default class AssetService implements IAssetService {
  constructor(
    private assetRepository: AssetRepository,
    private payrollService: PayrollExternalService,
    private assetHistoryRepository: AssetHistoryRepository
  ) {}
  // GET WORKERS INFO SELECT
  public async getWorkersInfoSelect() {
    const workersInfo = await this.payrollService.getAllWorkers();
    const workersInfoSelect = workersInfo.map((worker) => {
      const {
        firstName,
        secondName = "",
        surname,
        secondSurname = "",
        numberDocument,
      } = worker;
      return {
        value: Number(numberDocument),
        name: `${firstName} ${secondName} ${surname} ${secondSurname} - ${numberDocument}`,
        clerk: "Contratista",
      };
    });
    return new ApiResponse(workersInfoSelect, EResponseCodes.OK);
  }
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    const newAsset = await this.assetRepository.createAsset(payload);
    return new ApiResponse(newAsset, EResponseCodes.OK);
  }
  // GET ALL ASSETS PAGINATED
  public async getAllAssetsPaginated(filters: IAssetsFilters) {
    const assetsFound = await this.assetRepository.getAllAssetsPaginated(
      filters
    );
    return new ApiResponse(assetsFound, EResponseCodes.OK);
  }
  // GENERATE ASSET XLSX
  public async generateAssetXLSX(filters: IAssetsFilters) {
    const assetsFound = await this.getAllAssetsPaginated(filters);
    await generateXLSX({
      columns: assetXLSXcolumnNames,
      data: assetXLSXRows(assetsFound),
      filePath: assetXLSXFilePath,
      worksheetName: "Activos tecnológicos",
    });
    return new ApiResponse(assetXLSXFilePath, EResponseCodes.OK);
  }
  // GET ASSET BY ID
  public async getAssetById(id: number) {
    const assetFound = await this.assetRepository.getAssetById(id);
    return new ApiResponse(assetFound, EResponseCodes.OK);
  }
  // UPDATE ASSET BY ID
  public async updateAssetById(id: number, payload: IUpdateAssetSchema) {
    let auxPayload: IUpdateAssetSchema = payload;
    const assetFound = await this.getAssetById(id);
    const assetFoundSerialized =
      assetFound.data.serializeAttributes() as IAsset;
    if (
      payload?.type === TIPO_ACTIVOS.OTROS ||
      assetFoundSerialized.type === TIPO_ACTIVOS.OTROS
    ) {
      auxPayload = {
        ...payload,
        cpu: "",
        ram: "",
        storage: "",
        os: "",
      };
    }
    const updatedAsset = await this.assetRepository.updateAssetById(
      id,
      auxPayload
    );
    const { changes, thereAreChanges } =
      getChangesBetweenTwoObjects<IUpdateAssetSchema>(
        assetFound.data.serializeAttributes(),
        auxPayload
      );
    if (thereAreChanges) {
      await this.assetHistoryRepository.createAssetHistory({
        assetId: id,
        changes,
      });
    }
    return new ApiResponse(updatedAsset, EResponseCodes.OK);
  }
}
