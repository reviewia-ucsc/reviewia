export const getDate = (dateString) => {
  let dateObj = new Date(dateString);
  let date = dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `${date}`;
};

export const getTime = (timeString) => {
  let dateObj = new Date(timeString);
  let time = dateObj.toLocaleString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${time}`;
};

export const getDateTime = (dateTimeString) => {
  let date = getDate(dateTimeString);
  let time = getTime(dateTimeString);

  return `${date}, ${time}`;
};

export const checkDateTimeIsExpired = (datetime, mins = 30) => {
  let d1 = new Date(datetime);
  d1.setMinutes(d1.getMinutes() + mins);
  let now = new Date();

  return d1 > now;
};

export const getTimeRemains = (datetime, days = 7, hours = 0, mins = 0) => {
  let date1 = new Date(datetime);
  let now = new Date();

  if (days > 0) date1.setDate(date1.getDate() + days);
  if (hours > 0) date1.setHours(date1.getHours() + hours);
  if (mins > 0) date1.setMinutes(date1.getMinutes() + mins);

  let ms = date1 - now;
  let s = 0;
  let m = 0;
  let h = 0;
  let d = 0;

  let day = 1000 * 60 * 60 * 24;
  let hour = 1000 * 60 * 60;
  let min = 1000 * 60;
  let sec = 1000;
  d = parseInt(ms / day);
  h = parseInt((ms % day) / hour);
  m = parseInt((ms % hour) / min);
  s = parseInt((ms % min) / sec);

  let remain = { d, h, m, s };
  return remain;
};
