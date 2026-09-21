export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function isPastDate(iso: string): boolean {
  return iso < todayISO();
}

export function eachDateInclusive(from: string, to: string): string[] {
  if (!from || !to) return [];
  const start = from <= to ? from : to;
  const end = from <= to ? to : from;
  const days: string[] = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

export function formatFiDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString("fi-FI", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export const MONTHS_FI = [
  "Tammikuu",
  "Helmikuu",
  "Maaliskuu",
  "Huhtikuu",
  "Toukokuu",
  "Kesäkuu",
  "Heinäkuu",
  "Elokuu",
  "Syyskuu",
  "Lokakuu",
  "Marraskuu",
  "Joulukuu",
] as const;

export const WEEKDAYS_FI = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"] as const;

export function monthGrid(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(year, monthIndex, 1);
  const pad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: pad }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toISODate(new Date(year, monthIndex, day)));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export type IsoWeekOption = {
  year: number;
  week: number;
  start: string;
  end: string;
};

export function getIsoWeekParts(date: Date): { year: number; week: number } {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { year: tmp.getUTCFullYear(), week };
}

export function isoWeekRange(year: number, week: number): { start: string; end: string } {
  const jan4 = new Date(year, 0, 4);
  const day = jan4.getDay() || 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (day - 1) + (week - 1) * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { start: toISODate(monday), end: toISODate(sunday) };
}

export function weeksInIsoYear(year: number): number {
  return getIsoWeekParts(new Date(year, 11, 28)).week;
}

export function upcomingWeeks(count = 4): IsoWeekOption[] {
  const now = new Date();
  const current = getIsoWeekParts(now);
  const result: IsoWeekOption[] = [];
  let year = current.year;
  let week = current.week;
  for (let i = 0; i < count; i += 1) {
    const max = weeksInIsoYear(year);
    if (week > max) {
      week = 1;
      year += 1;
    }
    result.push({ year, week, ...isoWeekRange(year, week) });
    week += 1;
  }
  return result;
}

export function matchingWeek(from: string, to: string): IsoWeekOption | undefined {
  return upcomingWeeks(12).find((option) => option.start === from && option.end === to);
}
