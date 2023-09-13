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
  // ACCOUNT STATEMENT
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
      "/:accountNum/get-by-account-number",
      "AccountStatementController.getAccountStatementByAccountNum"
    ).where("accountNum", Route.matchers.number());
    Route.get(
      "/:id/generate-account-statement-pdf",
      "AccountStatementController.generateAccountStatementPDF"
    ).where("id", Route.matchers.number());
    Route.get("/generate-xlsx", "AccountStatementController.generateXLSX");
  }).prefix("/account-statement");
  // ACCOUNT STATEMENT STATUS
  Route.group(() => {
    Route.get(
      "/get-all",
      "AccountStatementStatusController.getAllAccountStatementStatus"
    );
  }).prefix("/account-statement-status");
  // ACCOUNT STATEMENT TRACKING
  Route.group(() => {
    Route.put(
      "/:accountStatementId/update-or-create",
      "AccountStatementTrackingController.updateOrCreateAccountStatementTracking"
    ).where("accountStatementId", Route.matchers.number());
  }).prefix("/account-statement-tracking");
}).prefix("/api/v1");
