export type IDatabaseError = {
  code: string;
  message: string;
  sqlMessage: string;
};

export const enum DATABASE_ERRORS {
  ER_DUP_ENTRY = "ER_DUP_ENTRY",
  ER_ROW_IS_REFERENCED_2 = "ER_ROW_IS_REFERENCED_2",
  E_ROW_NOT_FOUND = "E_ROW_NOT_FOUND",
}

export const enum BusinessModelError {
  NIT_DUPLICATE = "rzo_razones_sociales_rzo_nit_unique",
}

export const enum CONTRACT_SQL_ERROR {
  NUM_CONTRACT_DUPLICATE = "ctr_contratos_ctr_numero_contrato_unique",
}

export const enum FURNITURE_SQL_ERROR {
  PLATE_DUPLICATE = "bie_bienes_inmueble_bie_placa_activo_unique",
}
