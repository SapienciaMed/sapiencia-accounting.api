import { GENERIC_LIST, TIPO_ACTIVOS } from "App/Constants/GenericListEnum";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAsset,
  IAssetFullInfo,
  IAssetSchema,
  IAssetsFilters,
  IUpdateAssetSchema,
} from "App/Interfaces/Asset";
import { IWorkerSelectInfo } from "App/Interfaces/Worker";
import AssetHistoryRepository from "App/Repositories/AssetHistoryRepository";
import AssetRepository from "App/Repositories/AssetRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import { getChangesBetweenTwoObjects, getClerkName } from "App/Utils/helpers";
import GenericMasterExternalService from "../external/GenericExternalService";
import PayrollExternalService from "../external/PayrollExternalService";
import { assetXLSXFilePath, assetXLSXRows, assetXLSXcolumnNames } from "./XLSX";

export interface IAssetService {
  createAsset(payload: IAssetSchema): Promise<ApiResponse<IAsset>>;
  getJoinedAssetInfo(asset: IAsset): Promise<IAssetFullInfo>;
  getAllAssetsPaginated(
    filters: IAssetsFilters
  ): Promise<ApiResponse<IPagingData<IAssetFullInfo>>>;
  generateAssetXLSX(filters: IAssetsFilters): Promise<ApiResponse<string>>;
  getAssetById(id: number): Promise<ApiResponse<IAsset & { clerk: string }>>;
  getAssetByIdRaw(id: number): Promise<ApiResponse<IAsset & { clerk: string }>>;
  updateAssetById(
    id: number,
    payload: IUpdateAssetSchema
  ): Promise<ApiResponse<IAsset>>;
  getWorkersInfoSelect(): Promise<ApiResponse<IWorkerSelectInfo[]>>;
  getAssetByPlate(plate: string): Promise<ApiResponse<IAsset>>;
}

export default class AssetService implements IAssetService {
  constructor(
    private assetRepository: AssetRepository,
    private payrollService: PayrollExternalService,
    private assetHistoryRepository: AssetHistoryRepository,
    private genericMasterService: GenericMasterExternalService
  ) {}
  // GET WORKERS INFO SELECT
  public async getWorkersInfoSelect() {
    const workersInfo = await this.payrollService.getAllActiveWorkers();
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
        clerk: getClerkName(worker),
      };
    });
    return new ApiResponse(workersInfoSelect, EResponseCodes.OK);
  }
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    const newAsset = await this.assetRepository.createAsset(payload);
    return new ApiResponse(newAsset, EResponseCodes.OK);
  }
  // GET JOINED ASSET INFO
  public async getJoinedAssetInfo(asset: IAsset) {
    const { area, campus, status, ownerId } = asset;
    const areaDataPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.AREA,
        area
      );
    const campusDataPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.CAMPUS,
        campus
      );
    const statusInfoPromise =
      this.genericMasterService.getGenericItemDescriptionByItemCode(
        GENERIC_LIST.EQUIPMENT_STATUS,
        status
      );
    const workerInfoPromise = this.payrollService.getWorkerByDocument(ownerId);
    const [areaData, campusData, statusData, workerData] = await Promise.all([
      areaDataPromise,
      campusDataPromise,
      statusInfoPromise,
      workerInfoPromise,
    ]);
    const {
      firstName,
      secondName = "",
      surname,
      secondSurname = "",
      numberDocument,
    } = workerData;
    const assetFoundMutated = {
      ...asset,
      ownerId: numberDocument,
      area: areaData.itemDescription,
      clerk: getClerkName(workerData),
      campus: campusData.itemDescription,
      status: statusData.itemDescription,
      ownerFullName: `${firstName} ${secondName} ${surname} ${secondSurname}`,
    };
    return assetFoundMutated;
  }
  // GET ALL ASSETS PAGINATED
  public async getAllAssetsPaginated(filters: IAssetsFilters) {
    const assetsFound = await this.assetRepository.getAllAssetsPaginated(
      filters
    );
    let assetsFoundMutatedPromises: Promise<IAssetFullInfo>[] = [];
    for (let asset of assetsFound.array) {
      const auxAssetMutatedPromise = this.getJoinedAssetInfo(asset);
      assetsFoundMutatedPromises.push(auxAssetMutatedPromise);
    }
    const assetsFoundMutated = await Promise.all(assetsFoundMutatedPromises);
    return new ApiResponse(
      { ...assetsFound, array: assetsFoundMutated },
      EResponseCodes.OK
    );
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
    const assetSerialized = assetFound.serializeAttributes() as IAsset;
    const assetJoined = await this.getJoinedAssetInfo(assetSerialized);
    const { ownerFullName, ownerId } = assetJoined;
    const assetFoundMutated = {
      ...assetJoined,
      ownerId: `${ownerFullName} - ${ownerId}`,
    };
    return new ApiResponse(assetFoundMutated, EResponseCodes.OK);
  }
  // GET ASSET BY ID
  public async getAssetByIdRaw(id: number) {
    const assetFound = (
      await this.assetRepository.getAssetById(id)
    ).serializeAttributes() as IAsset;
    const { ownerId } = assetFound;
    const workerData = await this.payrollService.getWorkerByDocument(ownerId);
    const assetFoundMutated = {
      ...assetFound,
      clerk: getClerkName(workerData),
    };
    return new ApiResponse(assetFoundMutated, EResponseCodes.OK);
  }
  // UPDATE ASSET BY ID
  public async updateAssetById(id: number, payload: IUpdateAssetSchema) {
    let auxPayload: IUpdateAssetSchema = payload;
    const assetFound = await this.assetRepository.getAssetById(id);
    const assetFoundSerialized = assetFound.$attributes;
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
    const { changes, thereAreChanges } =
      getChangesBetweenTwoObjects<IUpdateAssetSchema>(
        assetFoundSerialized,
        auxPayload
      );
    let updatedAsset: IAsset = {} as IAsset;
    if (thereAreChanges) {
      updatedAsset = await this.assetRepository.updateAssetById(id, auxPayload);
      await this.assetHistoryRepository.createAssetHistory({
        assetId: id,
        changes,
      });
    }
    return new ApiResponse(updatedAsset, EResponseCodes.OK);
  }
  // GET ASSET BY PLATE
  public async getAssetByPlate(plate: string) {
    const assetFound = await this.assetRepository.getAssetByPlate(plate);
    const assetSerialized = assetFound.serializeAttributes() as IAsset;
    const assetJoind = await this.getJoinedAssetInfo(assetSerialized);
    return new ApiResponse(assetJoind, EResponseCodes.OK);
  }
}
