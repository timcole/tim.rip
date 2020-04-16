export const timeSince = (date: string | number): string => {
  let seconds: number = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  let unit: string = "second";
  let direction: string = "ago";
  let value: number = seconds;

  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (value != 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
};
