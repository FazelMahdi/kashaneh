export function jalaaliYear(d: Date) {
  return Number.parseInt(d.toLocaleString('en-CA-u-ca-persian', { year: 'numeric' }));
}

export function jalaaliMonth(d: Date) {
  return +d.toLocaleString('en-CA-u-ca-persian', { month: 'numeric' });
}

export function jalaaliDay(d: Date) {
  return +d.toLocaleString('en-CA-u-ca-persian', { day: 'numeric' });
}

export function jalaaliWeekday(d: Date) {
  return d.toLocaleString('fa-u-ca-persian', { weekday: 'long' });
}

export function jalalliToGregorian(year: number, month: number, day: number) {
  const date = new Date(year + 621, 2, 18);

  while (jalaaliDay(date) !== 1) {
    date.setDate(date.getDate() + 1);
  }

  while (jalaaliYear(date) !== year) {
    date.setFullYear(date.getFullYear() + 1);
  }

  while (jalaaliMonth(date) !== month) {
    date.setMonth(date.getMonth() + 1);
  }

  while (jalaaliDay(date) !== day) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}
