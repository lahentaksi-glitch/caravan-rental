import type { RentalExtra, RentalProduct } from "@/types/rental";
import { hotTubRates } from "@/data/pricing";
import { getIsoWeekParts, parseISODate } from "@/lib/dates";

export function countNights(from: string, to: string): number {
  if (!from || !to) return 0;
  const start = parseISODate(from);
  const end = parseISODate(to);
  const diff = end.getTime() - start.getTime();
  if (diff < 0) return 0;
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights === 0 ? 1 : nights;
}

function eachNightStart(from: string, nights: number): Date[] {
  const start = parseISODate(from);
  return Array.from({ length: nights }, (_, index) => {
    return new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
  });
}

export function isFinnishPeakHoliday(iso: string): boolean {
  const date = parseISODate(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();

  if ((month === 4 && day === 30) || (month === 5 && day === 1)) return true;
  if ((month === 12 && day === 31) || (month === 1 && day === 1)) return true;
  if (month === 6 && day >= 19 && day <= 26 && (weekday === 5 || weekday === 6)) {
    return true;
  }
  return false;
}

export function hotTubNeedsQuote(from: string, to: string): boolean {
  if (!from || !to) return false;
  const nights = countNights(from, to);
  const dates = eachNightStart(from, Math.max(nights, 1)).map((date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });
  dates.push(to);
  return dates.some(isFinnishPeakHoliday);
}

export function calculateHotTubSubtotal(from: string, to: string): number {
  const nights = countNights(from, to);
  if (nights <= 0) return 0;

  const groups = new Map<string, number[]>();
  for (const date of eachNightStart(from, nights)) {
    const { year, week } = getIsoWeekParts(date);
    const key = `${year}-W${week}`;
    const days = groups.get(key) ?? [];
    days.push(date.getDay());
    groups.set(key, days);
  }

  let total = 0;
  for (const days of groups.values()) {
    const hasWeekendNight = days.some((day) => day === 5 || day === 6);
    const weekdayNights = days.filter((day) => day !== 5 && day !== 6);
    if (hasWeekendNight) total += hotTubRates.weekendPackage;

    const hasMonTueWed = [1, 2, 3].every((day) => weekdayNights.includes(day));
    if (hasMonTueWed) {
      total += hotTubRates.weekdayStretch;
      total += weekdayNights.filter((day) => day === 0).length * hotTubRates.weekdayNight;
    } else {
      total += weekdayNights.length * hotTubRates.weekdayNight;
    }
  }

  return total;
}

export function calculateRentalSubtotal(
  product: RentalProduct,
  nights: number,
  dateFrom?: string,
  dateTo?: string
): number {
  if (nights <= 0) return 0;
  if (product.category === "hot-tub" && dateFrom && dateTo) {
    return calculateHotTubSubtotal(dateFrom, dateTo);
  }
  if (nights >= 7) {
    const weeks = Math.floor(nights / 7);
    const remainder = nights % 7;
    return weeks * product.weeklyRate + remainder * product.nightlyRate;
  }
  if (nights === 2 || nights === 3) {
    return product.weekendRate;
  }
  return nights * product.nightlyRate;
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatExtraPrice(extra: Pick<RentalExtra, "price" | "priceFrom">): string {
  const amount = formatEuro(extra.price);
  return extra.priceFrom ? `alkaen ${amount}` : `+${amount}`;
}
