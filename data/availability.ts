import type { RentalSlug } from "@/types/rental";
import { eachDateInclusive } from "@/lib/dates";

export interface BookedRange {
  from: string;
  to: string;
}

export const bookedRangesByProduct: Record<RentalSlug, BookedRange[]> = {
  "knaus-sport-500-kd": [
    { from: "2026-09-26", to: "2026-09-28" },
    { from: "2026-10-10", to: "2026-10-17" },
    { from: "2026-11-01", to: "2026-11-03" },
  ],
  paljuvaunu: [
    { from: "2026-09-25", to: "2026-09-27" },
    { from: "2026-10-03", to: "2026-10-05" },
    { from: "2026-10-17", to: "2026-10-19" },
  ],
};

export function getBookedDates(slug: RentalSlug): string[] {
  return bookedRangesByProduct[slug].flatMap((range) =>
    eachDateInclusive(range.from, range.to)
  );
}

export function isDateBooked(slug: RentalSlug, iso: string): boolean {
  return getBookedDates(slug).includes(iso);
}

export function rangeHasBooked(
  slug: RentalSlug,
  from: string,
  to: string
): boolean {
  const booked = new Set(getBookedDates(slug));
  return eachDateInclusive(from, to).some((day) => booked.has(day));
}
