import type { Time } from "shared/types/time.types";

export function isValidDate(
  hour: number,
  minute: number,
  second: number,
): boolean {
  if (hour > 24 && hour < 0) return false;
  if (minute > 60 && minute < 0) return false;
  if (second > 60 && second < 0) return false;
  return true;
}

export const getNow = () => {
  const now = new Date();
  const time: Time = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };

  return time;
};
