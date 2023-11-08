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
import { PERMISSIONS } from "App/Constants/Permissions";

Route.get("/", () => "SAPIENCIA ACCOUNTING API");

Route.group(() => {
  // ==================================================================
  // ======================= ACCOUNT STATEMENT ========================
  Route.group(() => {
    Route.post(
      "/",
      "AccountStatementController.createAccountStatement"
    ).middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_CREATE}`);
    Route.post(
      "/get-paginated",
      "AccountStatementController.getAccountStatementFiltered"
    ).middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_CONSULT}`);
    Route.get(
      "/get-last",
      "AccountStatementController.getLastAccountStatement"
    ).middleware("auth");
    Route.put(
      "/update/:id",
      "AccountStatementController.updateAccountStatement"
    )
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_UPDATE}`);
    Route.get(
      "/get-by-id/:id",
      "AccountStatementController.getAccountStatementById"
    )
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.get(
      "/:accountNum/get-by-account-number",
      "AccountStatementController.getAccountStatementByAccountNum"
    )
      .where("accountNum", Route.matchers.number())
      .middleware("auth");
    Route.get(
      "/:id/generate-account-statement-pdf",
      "AccountStatementController.generateAccountStatementPDF"
    ).where("id", Route.matchers.number());
    // .middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_PDF}`);
    Route.get("/generate-xlsx", "AccountStatementController.generateXLSX");
    // .middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_EXCEL}`);
  }).prefix("/account-statement");
  // ==================================================================
  // =================== ACCOUNT STATEMENT TRACKING ===================
  Route.group(() => {
    Route.put(
      "/:accountStatementId/update-or-create",
      "AccountStatementTrackingController.updateOrCreateAccountStatementTracking"
    ).where("accountStatementId", Route.matchers.number());
  })
    .prefix("/account-statement-tracking")
    .middleware(`auth:${PERMISSIONS.ACCOUNT_STATEMENT_TRACKING_UPDATE}`);
  // ==================================================================
  // ============================ BUSINESS ============================
  Route.group(() => {
    Route.post("/", "BusinessController.createBusiness").middleware(
      `auth:${PERMISSIONS.BUSINESS_CREATE}`
    );
    Route.get("/:id/get-by-id", "BusinessController.getBusinessById")
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.post(
      "/get-paginated",
      "BusinessController.getBusinessPaginated"
    ).middleware(`auth:${PERMISSIONS.BUSINESS_CONSULT}`);
    Route.put("/:id/update", "BusinessController.updateBusiness")
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.BUSINESS_UPDATE}`);
    Route.get(
      "/get-all-business-info",
      "BusinessController.getAllBusinessInfo"
    ).middleware("auth");
    Route.delete("/:id/delete", "BusinessController.deleteBusinessById")
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.BUSINESS_DELETE}`);
  }).prefix("/business");
  // ==================================================================
  // ============================ CONTRACT ============================
  Route.group(() => {
    Route.post("/create", "ContractController.createContract").middleware(
      `auth:${PERMISSIONS.CONTRACT_CREATE}`
    );
    Route.post(
      "/get-paginated",
      "ContractController.getContractPaginated"
    ).middleware(`auth:${PERMISSIONS.CONTRACT_CONSULT}`);
    Route.get(
      "/get-info-select",
      "ContractController.getContractInfoSelect"
    ).middleware("auth");
    Route.get("/:id/get-by-id", "ContractController.getContractById")
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.put("/:id/update-by-id", "ContractController.updateContractById")
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.CONTRACT_UPDATE}`);
    Route.delete("/:id/delete-by-id", "ContractController.deleteContractById")
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.CONTRACT_DELETE}`);
  }).prefix("/contract");
  // ==================================================================
  // =========================== FURNITURE ============================
  Route.group(() => {
    Route.get(
      "/get-identification-users-select-info",
      "FurnitureController.getIdentificationUsersSelectInfo"
    ).middleware("auth");
    Route.get(
      "/get-workers-full-name-select-info",
      "FurnitureController.getWorkersFullNameSelectInfo"
    ).middleware("auth");
    Route.post("/create", "FurnitureController.createFurniture").middleware(
      `auth:${PERMISSIONS.FURNITURE_CREATE}`
    );
    Route.get("/:id/get-by-id", "FurnitureController.getFurnitureById")
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.get("/:id/get-by-id-raw", "FurnitureController.getFurnitureByIdRaw")
      .where("id", Route.matchers.number())
      .middleware(`auth:${PERMISSIONS.FURNITURE_DETAIL}`);
    Route.post(
      "/get-all-paginated",
      "FurnitureController.getAllFurnituresPaginated"
    ).middleware(`auth:${PERMISSIONS.FURNITURE_CONSULT}`);
    Route.put(
      "/:id/update-by-id",
      "FurnitureController.updateFurnitureById"
    ).where("id", Route.matchers.number());
    // .middleware(`auth:${PERMISSIONS.FURNITURE_UPDATE}`);
    Route.get("/generate-xlsx", "FurnitureController.generateFurnitureXLSX");
  }).prefix("/furniture");
  // ==================================================================
  // ======================= FURNITURE HISTORY ========================
  Route.group(() => {
    Route.get(
      "/:furnitureId/get-furniture-history-by-id",
      "FurnitureHistoryController.getFurnitureHistoryById"
    ).where("furnitureId", Route.matchers.number());
  }).prefix("/furniture-history");
  // ==================================================================
  // ============================= ASSET ==============================
  Route.group(() => {
    Route.get(
      "/get-workers-info-select",
      "AssetController.getWorkersInfoSelect"
    ).middleware("auth");
    Route.post("/create", "AssetController.createAsset");
    Route.post(
      "get-all-paginated",
      "AssetController.getAllAssetsPaginated"
    ).middleware("auth");
    Route.get("/generate-xlsx", "AssetController.generateAssetXLSX").middleware(
      "authWithQueryString"
    );
    Route.get("/:id/get-by-id", "AssetController.getAssetById")
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.get("/:id/get-by-id-raw", "AssetController.getAssetByIdRaw")
      .where("id", Route.matchers.number())
      .middleware("auth");
    Route.put("/:id/update", "AssetController.updateAssetById").where(
      "id",
      Route.matchers.number()
    );
  }).prefix("/asset");
  // ==================================================================
  // ========================= ASSET HISTORY ==========================
  Route.group(() => {
    Route.get(
      "/:assetId/get-asset-history-by-id",
      "AssetHistoryController.getAssetHistoryById"
    );
  }).prefix("/asset-history");
}).prefix("/api/v1");
