import moment from "moment";

export const formatDate = (date: any) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatDateWithHour = (date: any) => {
  return moment(date).format("HH:mm - DD/MM/YYYY");
};
