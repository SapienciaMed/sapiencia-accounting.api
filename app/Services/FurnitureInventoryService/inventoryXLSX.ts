import Application from "@ioc:Adonis/Core/Application";
import { IFurnitureInventoryMutated } from "App/Interfaces/FurnitureInventory";

export const furnitureInventoryXLSXcolumnNames = [
  {
    name: "Fecha inventario",
    size: 20,
  },
  {
    name: "Área",
    size: 20,
  },
  {
    name: "Estado",
    size: 12,
  },
  {
    name: "CC Usuario",
    size: 12,
  },
  {
    name: "Nombres y Apellidos",
    size: 30,
  },
  {
    name: "Funcionario",
    size: 12,
  },
  {
    name: "Fecha de adquisición",
    size: 20,
  },
  {
    name: "Tipo activo - Descripción",
    size: 20,
  },
  {
    name: "Marca",
    size: 12,
  },
  {
    name: "Modelo",
    size: 20,
  },
  {
    name: "Placa activo",
    size: 15,
  },
  {
    name: "Medidas",
    size: 12,
  },
  {
    name: "Propietario activo",
    size: 15,
  },
  {
    name: "Observaciones",
    size: 40,
  },
];

export const furnitureInventoryXLSXRows = (
  inventoryFound: IFurnitureInventoryMutated[]
) =>
  inventoryFound.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.createdAt.toString().replace(/\//g, "-"),
        curr.furniture.area,
        curr.furniture.equipmentStatus,
        curr.furniture.userIdentification,
        curr.furniture.fullName,
        curr.furniture.clerk,
        curr.furniture.acquisitionDate.toString().replace(/\//g, "-"),
        curr.furniture.description,
        curr.furniture.brand,
        curr.furniture.model,
        curr.furniture.plate,
        curr.furniture.measure,
        curr.furniture.activeOwner,
        curr.furniture.observation,
      ],
    ];
  }, []);

export const furnitureInventoryXLSXFilePath = Application.tmpPath(
  "/inventario_bien_mueble.xlsx"
);
