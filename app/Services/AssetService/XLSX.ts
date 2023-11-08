import Application from "@ioc:Adonis/Core/Application";
import { IAssetFullInfo } from "App/Interfaces/Asset";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export const assetXLSXcolumnNames = [
  {
    name: "Tipo equipo",
    size: 20,
  },
  {
    name: "Área",
    size: 20,
  },
  {
    name: "Estado",
    size: 20,
  },
  {
    name: "CC usuario",
    size: 30,
  },
  {
    name: "Nombres y apellidos",
    size: 30,
  },
  {
    name: "Funcionario",
    size: 15,
  },
  {
    name: "Fecha de adquisición",
    size: 25,
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
    size: 25,
  },
  {
    name: "Serial",
    size: 25,
  },
  {
    name: "Observaciones",
    size: 50,
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

export const assetXLSXRows = (
  assetsFound: ApiResponse<IPagingData<IAssetFullInfo>>
) =>
  assetsFound.data.array.reduce((prev, curr) => {
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
        curr.cpu,
        curr.ram,
        curr.storage,
        curr.os,
      ],
    ];
  }, []);

export const assetXLSXFilePath = Application.tmpPath(
  "/activos_tecnologicos.xlsx"
);
