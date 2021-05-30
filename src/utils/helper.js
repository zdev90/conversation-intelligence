export function hhmmss(seconds) {
  const total = parseFloat(seconds.slice(0, -1));
  const sec = Math.floor(total % 60);
  const min = Math.floor(total / 60) % 60;
  const hour = Math.floor(total / 3600);

  return `${hour ? hour.toString().padStart(2, '0') + ':' : ''}${min
    .toString()
    .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}
