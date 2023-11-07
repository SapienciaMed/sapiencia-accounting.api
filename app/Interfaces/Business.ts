import { DateTime } from "luxon";

export interface IBusiness {
  id?: number;
  name: string;
  nit: string;
  address: string;
  municipalityCode: string;
  userModified?: string;
  userCreate: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  phone: string;
}

export type IBusinessPaginated = Omit<
  IBusiness,
  "userModified" | "userCreate" | "createdAt" | "updatedAt"
>;

export type IBusinessDataSelect = Pick<
  IBusiness,
  "municipalityCode" | "address" | "phone" | "nit" | "name"
> & { municipality: string };

export interface IBusinessPaginatedWithMunicipality extends IBusinessPaginated {
  municipality: string;
}

export type IBusinessSchema = Omit<IBusiness, "userCreate">;

export type IBusinessUpdateSchema = Partial<IBusiness>;

export type IBusinessInfoSelect = {
  name: string;
  value: number;
  data: IBusinessDataSelect;
};

export interface IBusinessGetById extends IBusiness {
  municipality: string;
}

export type IBusinessPaginateFilters = {
  id: number;
  page: number;
  perPage: number;
};
