import type { Time } from "shared/types/time.types";

export const getTimeString = (time: Date) => {
  return time.toLocaleTimeString();
};

export const getTimeStringShort = (time: Date) => {
  return time.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeIsoString = (time: Date) => {
  return time.toISOString();
};

export const getTimeTypeToDate = (stringDate: Time) => {
  const date = new Date();
  return date.setHours(
    stringDate.hours,
    stringDate.minutes,
    stringDate.seconds,
  );
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/:/g, ':');
};
