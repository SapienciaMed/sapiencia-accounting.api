declare module "@ioc:core.ContractProvider" {
  import { IContractService } from "App/Services/ContractService";
  const ContractProvider: IContractService;
  export default ContractProvider;
}
