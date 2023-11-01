import {
  ASSET_SQL_ERROR,
  DATABASE_ERRORS,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import { IAsset, IAssetSchema, IAssetsFilters } from "App/Interfaces/Asset";
import Asset from "App/Models/Asset";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAssetRepository {
  createAsset(payload: IAssetSchema): Promise<IAsset>;
  getAllAssetsPaginated(filters: IAssetsFilters): Promise<IPagingData<IAsset>>;
}

export default class AssetRepository implements IAssetRepository {
  // CREATE ASSET
  public async createAsset(payload: IAssetSchema) {
    try {
      const newAsset = new Asset();
      const currentUserId = process.env.CURRENT_USER_DOCUMENT;
      newAsset.fill({ ...payload, userCreated: currentUserId });
      return await newAsset.save();
    } catch (err) {
      const { code, sqlMessage } = err as IDatabaseError;
      switch (code) {
        case DATABASE_ERRORS.ER_DUP_ENTRY:
          if (sqlMessage.includes(ASSET_SQL_ERROR.PLATE_DUPLICATE)) {
            throw new Error("La placa ingresada ya existe");
          } else if (sqlMessage.includes(ASSET_SQL_ERROR.SERIAL_DUPLICATE)) {
            throw new Error("El serial ingresado ya existe");
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
}
