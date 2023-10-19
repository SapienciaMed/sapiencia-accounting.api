import Application from "@ioc:Adonis/Core/Application";
import { IFurnitureMutated } from "App/Interfaces/Furniture";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export const furnitureXLSXcolumnNames = [
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

export const furnitureXLSXRows = (
  furnituresFound: ApiResponse<IPagingData<IFurnitureMutated>>
) =>
  furnituresFound.data.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.area,
        curr.equipmentStatus,
        curr.userIdentification,
        curr.fullName,
        curr.clerk,
        curr.acquisitionDate.toString().replace(/\//g, "-"),
        curr.description,
        curr.brand,
        curr.model,
        curr.plate,
        curr.measure,
        curr.activeOwner,
        curr.observation,
      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath("/activos_fijos.xlsx");
