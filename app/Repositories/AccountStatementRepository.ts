import { IAccountStatement } from "App/Interfaces/AccountStatement";
import AccountStatement from "App/Models/AccountStatement";

export interface IAccountStatementRepository {
    create(payload: IAccountStatement): Promise<IAccountStatement>;
}

export default class AccountStatementRepository implements IAccountStatementRepository {
    async create(payload: IAccountStatement): Promise<IAccountStatement> {
        const newAccountStatement = new AccountStatement()
        await newAccountStatement.fill({ ...payload }).save()
        return newAccountStatement.serialize() as IAccountStatement
    }
}