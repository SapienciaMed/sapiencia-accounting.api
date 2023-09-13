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
