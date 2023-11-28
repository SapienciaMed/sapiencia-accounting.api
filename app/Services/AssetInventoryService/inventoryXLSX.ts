import Application from "@ioc:Adonis/Core/Application";
import { IAssetInventoryFullInfo } from "App/Interfaces/AssetInventory";

export const assetInventoryXLSXcolumnNames = [
  {
    name: "Fecha inventario",
    size: 20,
  },
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

export const assetInventoryXLSXRows = (
  inventoryFound: IAssetInventoryFullInfo[]
) =>
  inventoryFound.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.createdAt.toString(),
        curr.asset.type,
        curr.asset.area,
        curr.asset.status,
        curr.asset.ownerId,
        curr.asset.ownerFullName,
        curr.asset.clerk,
        curr.asset.ownerDate.toString(),
        curr.asset.equipmentType,
        curr.asset.brand,
        curr.asset.model,
        curr.asset.plate,
        curr.asset.serial,
        curr.asset.observations,
        curr.asset?.cpu ?? "N/A",
        curr.asset?.ram ?? "N/A",
        curr.asset?.storage ?? "N/A",
        curr.asset?.os ?? "N/A",
      ],
    ];
  }, []);

export const assetInventoryXLSXFilePath = Application.tmpPath(
  "/inventario_activos_tecnologicos.xlsx"
);
