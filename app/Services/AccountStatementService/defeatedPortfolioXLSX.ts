import Application from "@ioc:Adonis/Core/Application";
import { IAccountStatementTracking } from "App/Interfaces/AccountStatementTracking";
import { IPagingData } from "App/Utils/ApiResponses";
import moment from "moment";

export const defeatedPortfolioReportXLSXColumns = [
  {
    name: "NO. CUENTA DE COBRO",
    size: 20,
  },
  {
    name: "ESTADO",
    size: 20,
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
    name: "FECHA DE VENCIMIENTO",
    size: 30,
  },
  {
    name: "DÍAS DE VENCIMIENTO",
    size: 20,
  },
  {
    name: "GESTIÓN",
    size: 20,
  },
];

export const defeatedPortfolioReportXLSXRows = (
  accountStatementsFound: IPagingData<IAccountStatementTracking>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    moment.locale("es");
    return [
      ...prev,
      [
        String(curr.accountStatement.accountNum),
        "VENCIDA",
        curr.accountStatement.contract.business.nit,
        curr.accountStatement.contract.business.name,
        curr.accountStatement.expirationDate.toString(),
        moment(curr.accountStatement.expirationDate.toString()).fromNow(),
        "",
      ],
    ];
  }, []);

export const defeatedPortfolioReportXLSXFilePath = Application.tmpPath(
  "/informe_cartera_vencida.xlsx"
);
