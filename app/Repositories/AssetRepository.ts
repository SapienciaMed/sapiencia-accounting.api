import Env from "@ioc:Adonis/Core/Env";
import {
  ASSET_SQL_ERROR,
  DATABASE_ERRORS,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import {
  IAsset,
  IAssetSchema,
  IAssetsFilters,
  IUpdateAssetSchema,
} from "App/Interfaces/Asset";
import Asset from "App/Models/Asset";
import { IPagingData } from "App/Utils/ApiResponses";
export interface IAssetRepository {
  createAsset(payload: IAssetSchema): Promise<IAsset>;
  getAllAssetsPaginated(filters: IAssetsFilters): Promise<IPagingData<IAsset>>;
  getAssetById(id: number): Promise<IAsset>;
  updateAssetById(id: number, payload: IUpdateAssetSchema): Promise<IAsset>;
  getAssetByPlate(plate: string): Promise<IAsset>;
  getManyAssets(assetIds: Array<number>): Promise<IAsset[]>;
}

export default class AssetRepository implements IAssetRepository {
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    try {
      const newAsset = new Asset();
      const currentUserId = Env.get("CURRENT_USER_DOCUMENT");
      newAsset.fill({ ...payload, userCreated: currentUserId });
      return await newAsset.save();
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(ASSET_SQL_ERROR.PLATE_DUPLICATE)) {
            throw new Error("El activo ingresado ya existe"); // PLATE DUPLICATED
          } else if (sqlMessage.includes(ASSET_SQL_ERROR.SERIAL_DUPLICATE)) {
            throw new Error("El activo ingresado ya existe"); // SERIAL DUPLICATED
          }
        default:
          throw new Error(err);
      }
    }
  }
  // GET ALL ASSETS PAGINATED
  public async getAllAssetsPaginated(filters: IAssetsFilters) {
    const { page, perPage, plate, serial, campus, ownerId, type } = filters;
    const assetsQuery = Asset.query();
    if (plate) {
      assetsQuery.where("plate", plate);
    }
    if (serial) {
      assetsQuery.where("serial", serial);
    }
    if (campus) {
      assetsQuery.where("campus", campus);
    }
    if (ownerId) {
      assetsQuery.where("ownerId", ownerId);
    }
    if (type) {
      assetsQuery.where("type", type);
    }
    const { data, meta } = (
      await assetsQuery.paginate(page, perPage)
    ).serialize();
    return { array: data as IAsset[], meta };
  }
  // GET ASSET BY ID
  public async getAssetById(id: number) {
    try {
      return await Asset.findOrFail(id);
    } catch (err) {
      const { code } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.E_ROW_NOT_FOUND:
          throw new Error("Activo inexistente");
        default:
          throw new Error(err);
      }
    }
  }
  // UPDATED ASSET BY ID
  public async updateAssetById(id: number, payload: IUpdateAssetSchema) {
    const assetFound = await this.getAssetById(id);
    const currentUserId = Env.get("CURRENT_USER_DOCUMENT");
    return await assetFound
      .merge({ ...payload, userModified: currentUserId })
      .save();
  }
  // GET ASSET BY PLATE
  public async getAssetByPlate(plate: string) {
    try {
      return await Asset.findByOrFail("plate", plate);
    } catch (err) {
      const { code } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.E_ROW_NOT_FOUND:
          throw new Error("Activo inexistente");
        default:
          throw new Error(err);
      }
    }
  }
  // GET MANY ASSETS
  public async getManyAssets(assetIds: Array<number>) {
    const assetQuery = Asset.query();
    const assetsFound = await assetQuery.whereIn("id", assetIds);
    return assetsFound.map((asset) => asset.serializeAttributes() as IAsset);
  }
}
