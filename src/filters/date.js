import moment from "moment";

export const monthday = value => {
  return moment(value).format("MMMM Do");
};

export const shortdate = value => {
  return moment(+value).format("dddd MMMM Do");
};
export const longdate = value => {
  return moment(value).format("dddd, MMMM Do YYYY");
};

export const deciderdate = value => {
  return moment(+value).format("MMM Do");
};

export const plustime = value => {
  return moment(+value).format("dddd, MMMM Do YYYY - HH:ss");
};

export const ago = value => {
  return moment(value).fromNow();
};

export const showMonth = value => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (!value) return;
  for (let i = 1; i <= 12; i++) {
    if (value === i) {
      return months[i - 1];
    }
  }
};
