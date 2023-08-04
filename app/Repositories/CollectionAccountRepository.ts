import {
  ICollectionAccounts,
  // IGetCollectionAccountsList,
  // IFilterCollectionAccounts,
} from "App/Interfaces/CollectionAccountInterface";

// import CollectionAccount from "App/Models/CollectionAccount";
// import { IPagingData } from "App/Utils/ApiResponses";

export interface ICollectionAccountRepository {

  createCollectionAccounts(collectionAccount: ICollectionAccounts): Promise<ICollectionAccounts>;

}


export default class CollectionAccountRepository implements ICollectionAccountRepository{

  //?CREAR INCAPACIDAD
  async createCollectionAccounts(collectionAccount: ICollectionAccounts): Promise<any/*ICollectionAccounts*/> {


    //TODO: Pendiente de que nos habiliten el ambiente en la nube para BD MySQL
    // const toCreate = new CollectionAccount();
    // toCreate.fill({ ...collectionAccount });
    // await toCreate.save();
    // return toCreate.serialize() as ICollectionAccounts;

    console.log({
      message: "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE CollectionAccountRepository",
      data: collectionAccount
    })


  }

}
