"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RentalSlug } from "@/types/rental";
import { rangeHasBooked } from "@/data/availability";
import {
  MONTHS_FI,
  WEEKDAYS_FI,
  formatFiDate,
  isPastDate,
  monthGrid,
  todayISO,
} from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  slug: RentalSlug;
  bookedDates: string[];
  dateFrom: string;
  dateTo: string;
  onChange: (from: string, to: string) => void;
  onHint?: (hint: string) => void;
}

export function BookingCalendar({
  slug,
  bookedDates,
  dateFrom,
  dateTo,
  onChange,
  onHint,
}: BookingCalendarProps) {
  const today = todayISO();
  const initial = dateFrom ? new Date(`${dateFrom}T12:00:00`) : new Date();
  const [cursor, setCursor] = useState({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  });
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const booked = useMemo(() => new Set(bookedDates), [bookedDates]);
  const cells = monthGrid(cursor.year, cursor.month);

  const previewRange =
    dateFrom && !dateTo && hoverDate
      ? {
          from: hoverDate < dateFrom ? hoverDate : dateFrom,
          to: hoverDate < dateFrom ? dateFrom : hoverDate,
        }
      : null;

  const minMonth = new Date();
  const canGoPrev =
    cursor.year > minMonth.getFullYear() ||
    (cursor.year === minMonth.getFullYear() && cursor.month > minMonth.getMonth());

  function shiftMonth(delta: number) {
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  function selectDay(iso: string) {
    if (isPastDate(iso) || booked.has(iso)) return;

    if (!dateFrom || (dateFrom && dateTo)) {
      onChange(iso, "");
      onHint?.("Valitse päättymispäivä kalenterista.");
      return;
    }

    if (iso === dateFrom) {
      onChange("", "");
      onHint?.("");
      return;
    }

    const from = iso < dateFrom ? iso : dateFrom;
    const to = iso < dateFrom ? dateFrom : iso;
    if (rangeHasBooked(slug, from, to)) {
      onHint?.("Valittu jakso sisältää varattuja päiviä. Valitse toinen aikaväli.");
      return;
    }
    onChange(from, to);
    onHint?.("");
  }

  function dayState(iso: string) {
    const isBooked = booked.has(iso);
    const isPast = isPastDate(iso);
    const isStart = iso === dateFrom;
    const isEnd = iso === dateTo;
    const inSelected =
      Boolean(dateFrom && dateTo && iso >= dateFrom && iso <= dateTo);
    const inPreview =
      Boolean(
        previewRange && iso >= previewRange.from && iso <= previewRange.to
      );
    const previewBlocked = Boolean(
      previewRange &&
        rangeHasBooked(slug, previewRange.from, previewRange.to)
    );
    return {
      isBooked,
      isPast,
      isStart,
      isEnd,
      inSelected,
      inPreview,
      previewBlocked,
      isToday: iso === today,
    };
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-3 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-xl sm:size-9"
          disabled={!canGoPrev}
          onClick={() => shiftMonth(-1)}
          aria-label="Edellinen kuukausi"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <p className="text-sm font-semibold tracking-tight sm:text-base">
          {MONTHS_FI[cursor.month]} {cursor.year}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-xl sm:size-9"
          onClick={() => shiftMonth(1)}
          aria-label="Seuraava kuukausi"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:gap-1.5 sm:text-xs">
        {WEEKDAYS_FI.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((iso, index) => {
          if (!iso) {
            return <div key={`empty-${index}`} />;
          }
          const state = dayState(iso);
          const disabled = state.isBooked || state.isPast;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => selectDay(iso)}
              onMouseEnter={() => setHoverDate(iso)}
              onMouseLeave={() => setHoverDate(null)}
              aria-label={
                state.isBooked
                  ? `${formatFiDate(iso)}, varattu`
                  : state.isPast
                    ? `${formatFiDate(iso)}, mennyt`
                    : formatFiDate(iso)
              }
              aria-pressed={state.isStart || state.isEnd || state.inSelected}
              className={cn(
                "relative flex h-12 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 touch-manipulation select-none",
                "sm:aspect-square sm:h-auto sm:min-h-11 sm:rounded-xl",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                state.isPast &&
                  !state.isBooked &&
                  "cursor-not-allowed bg-muted/50 text-muted-foreground/50",
                state.isBooked &&
                  "cursor-not-allowed bg-rose-50 text-rose-400 ring-1 ring-inset ring-rose-200/90 line-through decoration-rose-300 decoration-1",
                !disabled &&
                  !state.inSelected &&
                  !state.isStart &&
                  "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200/90 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-emerald-200 [@media(hover:hover)]:hover:shadow-sm [@media(hover:hover)]:hover:ring-emerald-300",
                state.inPreview &&
                  !state.inSelected &&
                  !state.isBooked &&
                  (state.previewBlocked
                    ? "bg-rose-100 text-rose-700 ring-rose-200"
                    : "bg-accent/20 text-foreground ring-accent/30"),
                (state.inSelected || state.isStart || state.isEnd) &&
                  "bg-primary text-primary-foreground shadow-sm ring-0",
                (state.isStart || state.isEnd) && "ring-2 ring-accent sm:scale-[1.04]",
                state.isToday &&
                  !state.isBooked &&
                  "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-accent"
              )}
            >
              {parseISODateSafe(iso)}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-emerald-100 ring-1 ring-emerald-300" />
          Vapaa
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-rose-50 ring-1 ring-rose-200" />
          Varattu
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-primary" />
          Valittu
        </li>
        {dateFrom ? (
          <li className="w-full sm:ml-auto sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onChange("", "");
                onHint?.("");
              }}
              className="min-h-10 rounded-lg px-3 py-2 font-medium text-foreground underline-offset-2 hover:underline"
            >
              Tyhjennä valinta
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function parseISODateSafe(iso: string): number {
  return Number(iso.slice(8, 10));
}
