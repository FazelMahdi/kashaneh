import { jalaaliDay, jalaaliYear } from './date';

type DateLike = Date | string | number;

export function formatDatetime(date: DateLike) {
  const d = new Date(date);
  const time = formatTime(d.toLocaleTimeString('fa-u-ca-persian'));
  return `${formatDate(d)} ساعت ${time}`;
}

// export function formatDatetimeNumeric(date: DateLike) {
//   const d = new Date(date);
//   return d.toLocaleString('fa-u-ca-persian');
// }

export function formatDate(date: DateLike) {
  const d = new Date(date);
  const month = d.toLocaleString('fa-u-ca-persian', { month: 'long' });
  return `${jalaaliDay(d)} ${month} ${jalaaliYear(d)}`;
}

// export function formatDateNumeric(date: DateLike) {
//   const d = new Date(date);
//   return d.toLocaleString('fa-u-ca-persian');
// }

export function formatTime(time: string) {
  return time.split(':').slice(0, 2).join(':');
}
