/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "API contabilidad de SAPIENCIA";
});

Route.group(() => {
  // Cuentas de Cobro
  Route.group(() => {
    Route.post("/", "AccountStatementController.create");
    Route.patch("/", "AcountStatementController.update");
    Route.get("/get-filtered", "AccountStatementController.getAccountStatementFiltered");
    // Route.delete("/delete/:id", "CollectionAccountsController.deleteCollectionAccounts");
    // Route.get("/get-by-id/:id", "CollectionAccountsController.getByIdCollectionAccounts");
  }).prefix("/account-statement");
}).prefix("/api/v1")

// Route.group(() => {
//   Route.get("/get-by-id/:id", "BusinessController.getBusinessById");
// }).prefix("/api/v1/business");
// // .middleware("auth");

// //?Routing para Razones Sociales
// Route.group(() => {
//   Route.get("/get-list", "SocialReasonsController.getSocialReasons");
// }).prefix("/api/v1/social-reasons");

// //?Routing para Contratos
// Route.group(() => {
//   Route.get("/get-list", "ContractsController.getContracts");
// }).prefix("/api/v1/contracts");