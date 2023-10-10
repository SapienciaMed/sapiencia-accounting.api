import moment from "moment-timezone";

export const tzToAmericaBogota = (date: string) => {
  console.log(date);
  const m = moment(date);
  console.log(m.tz("America/Bogota").format("DD/MM/YYYY"));
  return m.tz("America/Bogota").format("DD/MM/YYYY");
};
