import Env from "@ioc:Adonis/Core/Env";
import { TIPO_FUNCIONARIO } from "App/Constants/GenericListEnum";
import { IWorker } from "App/Interfaces/Worker";
import { DateTime } from "luxon";
import moment from "moment";

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

export const dateFormatted = (date: string, format: string) => {
  moment.locale("es");
  return moment(date).format(format);
};

export const getChangesBetweenTwoObjects = <T>(oldObject: T, newObject: T) => {
  let thereAreChanges = false;
  const changes = {
    oldChanges: {} as T,
    newChanges: {} as T,
  };
  for (let key in newObject) {
    if (oldObject[key] !== newObject[key]) {
      if (newObject[key] instanceof DateTime) {
        const auxNewObject = newObject[key] as unknown as DateTime;
        const auxOldObject = oldObject[key] as unknown as DateTime;
        if (auxOldObject.toSQL() === auxNewObject.toSQL()) continue;
      }
      if (!thereAreChanges) thereAreChanges = true;
      changes.oldChanges[key] = oldObject[key];
      changes.newChanges[key] = newObject[key];
    }
  }
  return { changes, thereAreChanges };
};

export const getAuthHeaders = () => ({
  permissions: Env.get("CURRENT_PERMISSIONS"),
  authorization: Env.get("CURRENT_AUTHORIZATION"),
});

export const getClerkName = (worker: IWorker) => {
  // (4 prestacion de servicios) === CONTRATISTA
  // (1, 2 y 3) === VINCULADO
  const contractNumber = worker?.employment?.idTypeContract;
  if (contractNumber === 4) {
    return TIPO_FUNCIONARIO.CONTRATISTA;
  } else if (contractNumber === (1 || 2 || 3)) {
    return TIPO_FUNCIONARIO.VINCULADO;
  } else {
    return TIPO_FUNCIONARIO.EMPTY;
  }
};

export const deleteRepetitions = (data: Array<number>) => {
  return [...new Set(data)];
};
