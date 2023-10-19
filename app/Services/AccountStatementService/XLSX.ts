import Application from "@ioc:Adonis/Core/Application";
import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";
import { formaterNumberToCurrency } from "App/Utils/helpers";
import { DateTime } from "luxon";

export const accountStatementXLSXColumns = [
  {
    name: "CONTRATO",
    size: 15,
  },
  {
    name: "N° CXC",
    size: 10,
  },
  {
    name: "FECHA EXPEDICIÓN",
    size: 25,
  },
  {
    name: "FECHA DE VENCIMIENTO",
    size: 25,
  },
  {
    name: "NIT",
    size: 20,
  },
  {
    name: "TERCERO",
    size: 50,
  },
  {
    name: "CONCEPTO",
    size: 70,
  },
  {
    name: "VALOR $",
    size: 20,
  },
];

export const accountStatementXLSXRows = (
  accountStatementsFound: IPagingData<IGetAccountStatementPaginated>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.contract.contractId,
        String(curr.accountNum),
        curr.expeditionDate.replace(/\//g, "-") ?? "",
        DateTime.fromISO(curr.expirationDate).toSQLDate() ?? "",
        curr.contract.business.nit,
        curr.contract.business.name,
        curr.concept,
        formaterNumberToCurrency(curr.valuePay),
      ],
    ];
  }, []);

export const accountStatementXLSXFilePath = Application.tmpPath(
  "/cuentas_de_cobro.xlsx"
);
