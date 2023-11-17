import Application from "@ioc:Adonis/Core/Application";
import { IAssetFullInfo } from "App/Interfaces/Asset";

export const assetXLSXcolumnNames = [
  {
    name: "Tipo equipo",
    size: 15,
  },
  {
    name: "Área",
    size: 25,
  },
  {
    name: "Estado",
    size: 15,
  },
  {
    name: "CC usuario",
    size: 15,
  },
  {
    name: "Nombres y apellidos",
    size: 35,
  },
  {
    name: "Funcionario",
    size: 15,
  },
  {
    name: "Fecha de adquisición",
    size: 20,
  },
  {
    name: "Tipo equipo",
    size: 20,
  },
  {
    name: "Marca",
    size: 15,
  },
  {
    name: "Modelo",
    size: 15,
  },
  {
    name: "Placa",
    size: 20,
  },
  {
    name: "Serial",
    size: 20,
  },
  {
    name: "Observaciones",
    size: 25,
  },
  {
    name: "CPU",
    size: 15,
  },
  {
    name: "RAM",
    size: 15,
  },
  {
    name: "Disco duro",
    size: 15,
  },
  {
    name: "Sistema Operativo",
    size: 20,
  },
];

export const assetXLSXRows = (assetsFound: IAssetFullInfo[]) =>
  assetsFound.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.type,
        curr.area,
        curr.status,
        curr.ownerId,
        curr.ownerFullName,
        curr.clerk,
        curr.ownerDate.toString(),
        curr.equipmentType,
        curr.brand,
        curr.model,
        curr.plate,
        curr.serial,
        curr.observations,
        curr?.cpu ?? "N/A",
        curr?.ram ?? "N/A",
        curr?.storage ?? "N/A",
        curr?.os ?? "N/A",
      ],
    ];
  }, []);

export const assetXLSXFilePath = Application.tmpPath(
  "/control_inventario.xlsx"
);
