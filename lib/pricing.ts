import type { RentalProduct } from "@/types/rental";
import { parseISODate } from "@/lib/dates";

export function countNights(from: string, to: string): number {
  if (!from || !to) return 0;
  const start = parseISODate(from);
  const end = parseISODate(to);
  const diff = end.getTime() - start.getTime();
  if (diff < 0) return 0;
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights === 0 ? 1 : nights;
}

export function calculateRentalSubtotal(
  product: RentalProduct,
  nights: number
): number {
  if (nights <= 0) return 0;
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
