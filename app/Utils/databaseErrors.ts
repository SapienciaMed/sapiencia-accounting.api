import { DATABASE_ERRORS, IDatabaseError } from "App/Constants/DatabaseErrors";

export const throwDatabaseError = (error: IDatabaseError) => {
  const { code, sqlMessage, message } = error;
  switch (code) {
    case DATABASE_ERRORS.ER_DUP_ENTRY:
      throw new Error(`Valor duplicado, ${sqlMessage}`);
    default:
      throw new Error(message);
  }
};
