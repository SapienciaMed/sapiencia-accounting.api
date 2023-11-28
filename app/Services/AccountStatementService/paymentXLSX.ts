import Application from "@ioc:Adonis/Core/Application";
import { IAccountStatementTracking } from "App/Interfaces/AccountStatementTracking";
import { IPagingData } from "App/Utils/ApiResponses";
import { formaterNumberToCurrency } from "App/Utils/helpers";

export const paymentReportXLSXColumns = [
  {
    name: "NO. CUENTA DE COBRO",
    size: 20,
  },
  {
    name: "FECHA DE PAGO",
    size: 20,
  },
  {
    name: "NIT",
    size: 20,
  },
  {
    name: "RAZÓN SOCIAL / NOMBRE",
    size: 30,
  },
  {
    name: "CONCEPTO DE COBRO",
    size: 50,
  },
  {
    name: "VALOR",
    size: 20,
  },
  {
    name: "CUENTA CONTABLE CRÉDITO",
    size: 30,
  },
  {
    name: "CUENTA CONTABLE DÉBITO",
    size: 30,
  },
];

export const paymentReportXLSXRows = (
  accountStatementsFound: IPagingData<IAccountStatementTracking>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.accountStatement.accountNum),
        curr.trackingDate.toString(),
        curr.accountStatement.contract?.business?.nit ?? "",
        curr.accountStatement.contract?.business?.name ?? "",
        curr.accountStatement.concept,
        formaterNumberToCurrency(curr.accountStatement.valuePay),
        curr.accountStatement.contract?.creditAccount ?? "",
        curr.accountStatement.contract?.debitAccount ?? "",
      ],
    ];
  }, []);

export const paymentReportXLSXFilePath = Application.tmpPath(
  "/cuentas_pagadas_reporte.xlsx"
);
