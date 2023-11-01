import {
  ASSET_SQL_ERROR,
  DATABASE_ERRORS,
  IDatabaseError,
} from "App/Constants/DatabaseErrors";
import { IAsset, IAssetSchema } from "App/Interfaces/Asset";
import Asset from "App/Models/Asset";

export interface IAssetRepository {
  createAsset(payload: IAssetSchema): Promise<IAsset>;
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
}
