import type { RentalProduct } from "@/types/rental";

export function countNights(from: string, to: string): number {
  if (!from || !to) return 0;
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
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
