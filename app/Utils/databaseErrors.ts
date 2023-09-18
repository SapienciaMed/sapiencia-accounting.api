type IDatabaseError = {
  code: string;
  message: string;
  sqlMessage: string;
};

const enum DATABASE_ERRORS {
  ER_DUP_ENTRY = "ER_DUP_ENTRY",
}

export const throwDatabaseError = (error: IDatabaseError) => {
  const { code, sqlMessage, message } = error;
  switch (code) {
    case DATABASE_ERRORS.ER_DUP_ENTRY:
      throw new Error(`Valor duplicado, ${sqlMessage}`);
    default:
      throw new Error(message);
  }
};
