import Application from "@ioc:Adonis/Core/Application";
import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";
import { IPagingData } from "App/Utils/ApiResponses";

export const managementReportXLSXColumns = [
  {
    name: "SI ES O NO RESPUESTA",
    size: 30,
  },
  {
    name: "N° DE RESPUESTA",
    size: 25,
  },
  {
    name: "FECHA RADICACIÓN",
    size: 25,
  },
  {
    name: "FECHA DOCUMENTO",
    size: 30,
  },
  {
    name: "TIPO DE CLIENTE",
    size: 30,
  },
  {
    name: "ID DEL USUARIO",
    size: 25,
  },
  {
    name: "REMITENTE",
    size: 25,
  },
  {
    name: "NIT O NÚMERO DE CÉDULA DEL CLIENTE",
    size: 50,
  },
  {
    name: "CÓDIGO DEL ASUNTO",
    size: 30,
  },
  {
    name: "CÓDIGO TIPO DE DOCUMENTO",
    size: 30,
  },
  {
    name: "ENVÍO AUTOMÁTICO A RUTA",
    size: 30,
  },
  {
    name: "CÓDIGO DE RUTA",
    size: 30,
  },
  {
    name: "DESCRIPCIÓN DEL DOCUMENTO",
    size: 50,
  },
  {
    name: "OBSERVACIONES",
    size: 80,
  },
  {
    name: "RUTA IMÁGENES",
    size: 30,
  },
  {
    name: "CONDICIÓN",
    size: 30,
  },
  {
    name: "DIRECCIÓN",
    size: 30,
  },
  {
    name: "TELÉFONO",
    size: 30,
  },
];

export const managementReportXLSXRows = (
  accountStatementsFound: IPagingData<IGetAccountStatementPaginated>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        "",
        "",
        "",
        curr.expeditionDate.replace(/\//g, "-") ?? "",
        "",
        "",
        "",
        curr.contract.business.nit,
        "",
        "",
        "",
        "",
        curr.concept,
        "",
        "",
        "",
        "",
        "",
      ],
    ];
  }, []);

export const managementReportXLSXFilePath = Application.tmpPath(
  "/reporte_gestion_documental.xlsx"
);
