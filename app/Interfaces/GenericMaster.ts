type IAdditionalFields = {
  departmentId: string;
};

export type IMunicipality = {
  id: number;
  grouper: string;
  itemCode: string;
  itemDescription: string;
  additionalFields: IAdditionalFields;
};
