import Application from "@ioc:Adonis/Core/Application";
import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";
import { formaterNumberToCurrency } from "App/Utils/helpers";

export const causationXLSXColumns = [
  {
    name: "N° CXC",
    size: 10,
  },
  {
    name: "NIT",
    size: 20,
  },
  {
    name: "RAZÓN SOCIAL / NOMBRE",
    size: 40,
  },
  {
    name: "VALOR",
    size: 20,
  },
  {
    name: "CUENTA CONTABLE DÉBITO",
    size: 30,
  },
  {
    name: "CUENTA CONTABLE CRÉDITO",
    size: 30,
  },
];

export const causationXLSXRows = (
  accountStatementsFound: IPagingData<IGetAccountStatementPaginated>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.accountNum),
        curr.contract.business.nit,
        curr.contract.business.name,
        formaterNumberToCurrency(curr.valuePay),
        curr.contract.debitAccount,
        curr.contract.creditAccount,
      ],
    ];
  }, []);

export const causationXLSXFilePath = Application.tmpPath(
  "/informe_causacion.xlsx"
);
