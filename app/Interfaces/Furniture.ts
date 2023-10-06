import { IDataPaginateFilters } from "App/Utils/ApiResponses";
import { DateTime } from "luxon";

export type IFurniture = {
  plate: string; // BIE_PLACA_ACTIVO
  description: string; // BIE_TIPO_ACTIVO_DESCRIPCION
  acquisitionDate: DateTime; // BIE_FECHA_ADQUISICION
  equipmentStatus: number; // BIE_ESTADO_EQUIPO
  userIdentification: string; // BIE_CC_USUARIO
  fullName: string; // BIE_NOMBRE_APELLIDO
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  brand: string;
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  clerk: number; // BIE_FUNCIONARIO
};

export type IFurnitureRaw = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: number;
  userIdentification?: string;
  fullName?: string;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
};

export type IFurnitureMutated = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: string;
  userIdentification: string;
  fullName: string;
  area: string;
  model: string;
  brand: string;
  measure: string;
  activeOwner: string;
  observation: string;
  clerk: string;
};

export type IFurnitureSchema = {
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: number;
  workerId?: number;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
};

export interface IFiltersFurnitureSchema extends IDataPaginateFilters {
  plate?: string;
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
}

export type IUpdateFurnitureSchema = {
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
  workerId?: number;
  area?: number;
  model?: string;
  brand?: string;
  measure?: string;
  activeOwner?: number;
  observation?: string;
  clerk?: number;
};

export type IUpdateFurniture = {
  description?: string;
  acquisitionDate?: DateTime;
  equipmentStatus?: number;
  userIdentification: string;
  fullName: string;
  area?: number;
  model?: string;
  brand?: string;
  measure?: string;
  activeOwner?: number;
  observation?: string;
  clerk?: number;
};
