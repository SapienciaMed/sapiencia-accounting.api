import Application from "@ioc:Adonis/Core/Application";
import { IAsset } from "App/Interfaces/Asset";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export const assetXLSXcolumnNames = [
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
];

export const assetXLSXRows = (assetsFound: ApiResponse<IPagingData<IAsset>>) =>
  assetsFound.data.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.equipmentType,
        curr.brand,
        curr.model,
        curr.plate,
        curr.serial,
        curr.observations,
      ],
    ];
  }, []);

export const assetXLSXFilePath = Application.tmpPath(
  "/activos_tecnologicos.xlsx"
);
