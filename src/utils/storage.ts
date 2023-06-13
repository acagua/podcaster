import { Entry } from "./interfaces";

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

export const setLocalStorage = (key: string, data: Entry[]) => {
  const currentDate = new Date();

  const apiResponse = {
    data,
    expireDate: currentDate.getTime() + DAY_IN_MS,
  };
  localStorage.setItem(key, JSON.stringify(apiResponse));
};

export const getLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return null;
  }
  const currentDate = new Date();
  const obj = JSON.parse(storedValue);
  if (obj.expireDate < currentDate.getTime()) {
    return null;
  }
  return obj.data;
};
