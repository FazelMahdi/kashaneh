type ActionType = 'minus' | 'plus';

export default function pastDays(day: number, type: ActionType = 'minus', date = new Date()) {
  const today = new Date(date);
  const lastDay = new Date(date);

  type === 'minus' && lastDay.setDate(today.getDate() - day);
  type === 'plus' && lastDay.setDate(today.getDate() + day);
  return lastDay.toJSON();
}

export function pastHours(minutes: number, type: ActionType = 'minus', date = new Date()) {
  const existDate = new Date(date);
  const offsetMilliseconds = minutes * 60000 * (type === 'plus' ? 1 : -1);
  const lastHour = new Date(existDate.getTime() + offsetMilliseconds);

  return lastHour;
}
