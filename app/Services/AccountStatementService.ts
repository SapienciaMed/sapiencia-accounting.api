import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAccountStatement } from "App/Interfaces/AccountStatement";
import AccountStatementRepository from "App/Repositories/AccountStatementRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IAccountStatementService {
    create(payload: IAccountStatement): Promise<ApiResponse<IAccountStatement>>;
}

export default class AccountStatementService implements IAccountStatementService {
    constructor(
        private accountStatementRepository: AccountStatementRepository
    ){}
    async create(payload: IAccountStatement): Promise<ApiResponse<IAccountStatement>> {
        const newAccountStatement = await this.accountStatementRepository.create(payload)
        return new ApiResponse(newAccountStatement, EResponseCodes.OK);
    }
}