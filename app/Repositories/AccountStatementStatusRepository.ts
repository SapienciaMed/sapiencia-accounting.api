import { IAccountStatementStatus } from "App/Interfaces/AccountStatementStatus";
import AccountStatementStatus from "App/Models/AccountStatementStatus";

export interface IAccountStatementStatusRepository {
  getAllAccountStatementStatus(): Promise<IAccountStatementStatus[]>;
}

export default class AccountStatementStatusRepository
  implements IAccountStatementStatusRepository
{
  // GET ALL ACCOUNT STATEMENT STATUS
  public async getAllAccountStatementStatus() {
    return await AccountStatementStatus.all();
  }
}
