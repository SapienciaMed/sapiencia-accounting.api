import {
  ICollectionAccounts,
  IFilterCollectionAccounts,
  IGetCollectionAccountsList,
} from "App/Interfaces/CollectionAccountInterface";

// import CollectionAccount from "App/Models/CollectionAccount";
import { IPagingData } from "App/Utils/ApiResponses";

export interface ICollectionAccountRepository {

  createCollectionAccounts(collectionAccount: ICollectionAccounts): Promise<ICollectionAccounts>;
  getCollectionAccountsPaginate(filters: IFilterCollectionAccounts): Promise<IPagingData<IGetCollectionAccountsList>>;
  getByIdCollectionAccounts(id: number): Promise<IGetCollectionAccountsList | null>;
  updateCollectionAccounts(collectionAccount: ICollectionAccounts, id: number): Promise<ICollectionAccounts | null>;
  deleteCollectionAccounts(id: number): Promise<boolean>;

}


export default class CollectionAccountRepository implements ICollectionAccountRepository{

  //?CREAR CUENTA DE COBRO
  async createCollectionAccounts(collectionAccount: ICollectionAccounts): Promise<any/*ICollectionAccounts*/> {


    //TODO: Pendiente de que nos habiliten el ambiente en la nube para BD MySQL
    // const toCreate = new CollectionAccount();
    // toCreate.fill({ ...collectionAccount });
    // await toCreate.save();
    // return toCreate.serialize() as ICollectionAccounts;

    console.log({
      message : "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE createCollectionAccounts",
      data    : collectionAccount
    })

  }

  //?LISTAR CUENTAS DE COBRO
  async getCollectionAccountsPaginate(filters: IFilterCollectionAccounts): Promise<any/*IPagingData<IGetCollectionAccountsList>*/>{

    // const res = CollectionAccount.query();

    // res.select(
    //   "id",
    //   "codContract",
    //   "numAccount",
    //   "dateExpedition",
    //   "dateExpired",
    //   "paymentType",
    //   "valuePay",
    //   "concept"
    // );

    // res.preload("codContract", (query) => {
    //   query.select("numContract");
    // });

    // res.preload("codSocialReason", (query) => {
    //   query.select("id", "name", "nit", "email");

    //   query.preload("socialReason", (query) => {
    //     query.select(
    //       "id",
    //       "typeDocument",
    //       "numberDocument",
    //       "firstName",
    //       "secondName",
    //       "surname",
    //       "secondSurname"
    //     );
    //   });
    // });

    // if (filters.idEmployee) {
    //   res.where("codEmployee", filters.idEmployee);
    // }

    // const incapacityEmploymentPaginated = await res.paginate(
    //   filters.page,
    //   filters.perPage
    // );

    // const { data, meta } = incapacityEmploymentPaginated.serialize();
    // const dataArray = data ?? [];

    // return {
    //   array: dataArray as IGetIncapacityList[],
    //   meta,
    // };

    console.log({
      message : "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE getCollectionAccountsPaginate",
      data    : filters
    })

  }

  //?MOSTRAR CUENTA DE COBRO POR ID - EL ID LLEGA COMO PARÁMETRO
  async getByIdCollectionAccounts(id: number): Promise<any/*IGetCollectionAccountsList | null*/>{

    // const res = await CollectionAccount.find(id);

    // await res!.load("codContract", (query) => {
    //      query.select("numContract");
    // });

    // await res!.load("incapacityEmployee", (query) => {
    //   query.select("id", "workerId", "institutionalMail");
    //   query.preload("workerEmployment", (query) => {
    //     query.select(
    //       "id",
    //       "typeDocument",
    //       "numberDocument",
    //       "firstName",
    //       "secondName",
    //       "surname",
    //       "secondSurname"
    //     );
    //   });
    // });

    // return res ? (res.serialize() as IGetIncapacityList) : null;

    console.log({
      message : "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE IGetCollectionAccountsList",
      data    : id
    })

  }

  //?ACTUALIZAR CUENTA DE COBRO - EL ID LLEGA POR BODY
  async updateCollectionAccounts(collectionAccount: ICollectionAccounts, id: number): Promise<any/*ICollectionAccounts | null*/>{

    // const toUpdate = await CollectionAccount.find(id);
    // if (!toUpdate) {
    //   return null;
    // }
    // toUpdate.fill({ ...collectionAccount });
    // await toUpdate.save();
    // return toUpdate.serialize() as ICollectionAccounts;

    console.log({
      message  : "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE updateCollectionAccounts",
      data     : collectionAccount,
      idUpdate : id
    })

  }

  //?ELIMINAR UNA CUENTA DE COBRO - EL ID LLEGA COMO PARÁMETRO
  async deleteCollectionAccounts(id: number): Promise<any/*boolean*/>{

    // const toDelete = await CollectionAccount.find(id);

    // if (!toDelete) {
    //   return false;
    // }

    // const toDelete = await CollectionAccount.query().where("roleId", id);
    // if (toDelete.length > 0) {
    //   await CollectionAccount.query().where("id", id).delete();
    // }

    // await toDelete.delete();
    // return true;

    console.log({
      message  : "LLEGUÉ HASTA EL REPOSITORIO -> HOLA DESDE deleteCollectionAccounts",
      idDelete : id
    })

  }

}
