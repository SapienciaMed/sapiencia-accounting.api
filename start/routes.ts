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

Route.get("/", () => "SAPIENCIA ACCOUNTING API");

Route.group(() => {
  // CUENTA DE COBRO
  Route.group(() => {
    Route.post("/", "AccountStatementController.createAccountStatement");
    Route.post(
      "/get-paginated",
      "AccountStatementController.getAccountStatementFiltered"
    );
    Route.get(
      "/get-last",
      "AccountStatementController.getLastAccountStatement"
    );
    Route.put(
      "/update/:id",
      "AccountStatementController.updateAccountStatement"
    ).where("id", Route.matchers.number());
    Route.get(
      "/get-by-id/:id",
      "AccountStatementController.getAccountStatementById"
    ).where("id", Route.matchers.number());
    Route.get(
      "/:id/generate-pdf",
      "AccountStatementController.generateAccountStatementPDF"
    ).where("id", Route.matchers.number());
  }).prefix("/account-statement");
}).prefix("/api/v1");


