export function parseTime(seconds, milliseconds = true) {
  return parseFloat(seconds.slice(0, -1)) * (milliseconds ? 1000 : 1);
}

export function hhmmss(seconds, milliseconds = false) {
  const total = parseTime(seconds, !milliseconds) / 1000;
  const sec = Math.floor(total % 60);
  const min = Math.floor(total / 60) % 60;
  const hour = Math.floor(total / 3600);

  return `${hour ? hour.toString().padStart(2, '0') + ':' : ''}${min
    .toString()
    .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export function isBetween(time, startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  return start <= time && time < end;
}

export function findString(text, word) {
  return text.toLowerCase().indexOf(word.toLowerCase()) > -1;
}
