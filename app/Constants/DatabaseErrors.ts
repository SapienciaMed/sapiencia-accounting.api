export type IDatabaseError = {
  code: string;
  message: string;
  sqlMessage: string;
};

export const enum DATABASE_ERRORS {
  ER_DUP_ENTRY = "ER_DUP_ENTRY",
}

export const enum BusinessModelError {
  NIT_DUPLICATE = "rzo_razones_sociales_rzo_nit_unique",
}
