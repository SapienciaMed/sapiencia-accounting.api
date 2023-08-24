import { IAccountStatement, IGetAllAccountStatement } from "App/Interfaces/AccountStatement";
import AccountStatement from "App/Models/AccountStatement";

export interface IAccountStatementRepository {
    create(payload: IAccountStatement): Promise<IAccountStatement>;
    getFiltered(filters: IGetAllAccountStatement): Promise<IAccountStatement[]>
}

export default class AccountStatementRepository implements IAccountStatementRepository {
    async create(payload: IAccountStatement): Promise<IAccountStatement> {
        const newAccountStatement = new AccountStatement()
        await newAccountStatement.fill({ ...payload }).save()
        return newAccountStatement.serialize() as IAccountStatement
    }
    async getFiltered(filters: IGetAllAccountStatement): Promise<IAccountStatement[]> {
        const { accountNum, contractCode, expirationDate } = filters
        const accountStatementQuery = AccountStatement.query()
        if (accountNum) {
            accountStatementQuery.where("accountNum", accountNum)
        }
        if (contractCode) {
            accountStatementQuery.where("contractCode", contractCode)
        }
        if (expirationDate) {
            accountStatementQuery.where("expirationDate", expirationDate.toString())
        }
        return await accountStatementQuery.finally()
    }
}