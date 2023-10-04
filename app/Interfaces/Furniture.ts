export type Furniture = {
  plate: string; // BIE_PLACA_ACTIVO
  description: string; // BIE_TIPO_ACTIVO_DESCRIPCION
  acquisitionDate: string; // BIE_FECHA_ADQUISICION
  equipmentStatus: number; // BIE_ESTADO_EQUIPO
  workerId: number;
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  clerk: number; // BIE_FUNCIONARIO
};
