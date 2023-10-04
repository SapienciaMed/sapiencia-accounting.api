export interface IWorker {
  userCreate: null;
  id: number;
  typeDocument: string;
  numberDocument: string;
  firstName: string;
  secondName: string;
  surname: string;
  secondSurname: string;
  gender: string;
  bloodType: string;
  birthDate: string;
  nationality: string;
  email: string;
  contactNumber: string;
  department: string;
  municipality: string;
  neighborhood: string;
  address: string;
  socioEconomic: string;
  eps: string;
  severanceFund: string;
  arl: string;
  fundPension: string;
  riskLevel: string;
  housingType: string;
  bank: string;
  accountBankType: string;
  accountBankNumber: string;
  userModified: null;
  dateModified: Date;
  dateCreate: Date;
  employment: IEmployment;
}

export interface IEmployment {
  id: number;
  workerId: number;
  idCharge: number;
  idTypeContract: number;
  institutionalMail: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  state: string;
  idReasonRetirement: null;
  retirementDate: null;
  salary: string;
  totalValue: string;
  observation: string;
  userModified: null;
  dateModified: Date;
  userCreate: null;
  dateCreate: Date;
}

export type IWorkerSelectInfo = {
  name: string;
  value: number;
};
