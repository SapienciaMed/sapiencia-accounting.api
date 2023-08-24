import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Contract from 'App/Models/Contract'

//   id?: number; // CTR_CODIGO
//   contractId: number; // CTR_NUMERO_CONTRATO
//   businessNameCode: number; // CTR_CODRZO_RAZON_SOCIAL
//   userModified?: string; // CTR_USUARIO_MODIFICO
//   userCreate: string; // CTR_USUARIO_CREO
//   createdAt?: DateTime; // CTR_FECHA_CREO
//   updatedAt?: DateTime; // CTR_FECHA_MODIFICO

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = "contractId"
    await Contract.updateOrCreateMany(uniqueKey, [
      {
        contractId: 12023,
        businessNameCode: 1,
        // userModified: null,
        userCreate: "0000 000 000"
      }
    ])
  }
}



