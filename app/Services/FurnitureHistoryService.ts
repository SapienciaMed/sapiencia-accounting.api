import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFurnitureHistory } from "App/Interfaces/FurnitureHistory";
import FurnitureHistoryRepository from "App/Repositories/FurnitureHistoryRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IFurnitureHistoryService {
  getFurnitureHistoryById(
    id: number
  ): Promise<ApiResponse<IFurnitureHistory[]>>;
}

export default class FurnitureHistoryService
  implements IFurnitureHistoryService
{
  constructor(private furnitureHistoryRepository: FurnitureHistoryRepository) {}
  // GET FURNITURE HISTORY BY ID
  public async getFurnitureHistoryById(furnitureId: number) {
    const furnitureHistoryFound =
      await this.furnitureHistoryRepository.getFurnitureHistoryById(
        furnitureId
      );
    return new ApiResponse(furnitureHistoryFound, EResponseCodes.OK);
  }
}
