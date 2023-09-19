import { DateTime } from "luxon";

export interface IBusiness {
  id?: number; // RZO_CODIGO
  name: string; // RZO_NOMBRE
  nit: string; // RZO_NIT
  address: string; // RZO_DIRECCION
  email: string; // RZO_CORREO_ELECTRONICO
  municipalityCode: string; // RZO_CODIGO_MUNICIPIO
  sender: string; // RZO_REMISOR
  chargeSender: string; // RZO_CARGO_REMISOR
  userModified?: string; // RZO_USUARIO_MODIFICO
  userCreate: string; // RZO_USUARIO_CREO
  createdAt?: DateTime; // RZO_FECHA_CREO
  updatedAt?: DateTime; // RZO_FECHA_MODIFICO
  phone: string; //RZO_TELEFONO
}

export type IBusinessPaginated = Omit<
  IBusiness,
  "userModified" | "userCreate" | "createdAt" | "updatedAt"
>;

export interface IBusinessPaginatedWithMunicipality extends IBusinessPaginated {
  municipality: string;
}

export type IBusinessSchema = Omit<IBusiness, "userCreate">;

export type IBusinessUpdateSchema = Partial<IBusiness>;

export type IBusinessInfoSelect = {
  name: string;
  value: number;
};

export interface IBusinessGetById extends IBusiness {
  municipality: string;
}

export type IBusinessPaginateFilters = {
  id: number;
  page: number;
  perPage: number;
};
