import { DateTime } from "luxon";
import moment from "moment-timezone";

export const tzToAmericaBogota = (date: Date) => {
  const sqlDate = DateTime.fromJSDate(date).toSQLDate();
  const columnDate = moment(sqlDate).tz("America/Bogota").format("DD/MM/YYYY");
  return columnDate;
};
