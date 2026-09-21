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
    <div className="rounded-2xl border border-white/50 bg-white/70 p-4 shadow-[0_18px_40px_-24px_rgba(20,40,80,0.45)] backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-xl"
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
          className="rounded-xl"
          onClick={() => shiftMonth(1)}
          aria-label="Seuraava kuukausi"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
        {WEEKDAYS_FI.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
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
                "relative flex aspect-square min-h-11 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 touch-manipulation sm:min-h-10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                state.isPast &&
                  !state.isBooked &&
                  "cursor-not-allowed bg-muted/60 text-muted-foreground/60",
                state.isBooked &&
                  "cursor-not-allowed bg-red-500 text-white shadow-sm line-through decoration-white/80",
                !disabled &&
                  !state.inSelected &&
                  !state.isStart &&
                  "bg-emerald-50 text-emerald-900 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md",
                state.inPreview &&
                  !state.inSelected &&
                  !state.isBooked &&
                  (state.previewBlocked
                    ? "bg-red-100 text-red-800"
                    : "bg-accent/20 text-foreground"),
                (state.inSelected || state.isStart || state.isEnd) &&
                  "bg-primary text-primary-foreground shadow-md",
                (state.isStart || state.isEnd) && "ring-2 ring-accent scale-[1.04]",
                state.isToday && !state.isBooked && "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-accent"
              )}
            >
              {parseISODateSafe(iso)}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-emerald-100 ring-1 ring-emerald-300" />
          Vapaa
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-red-500" />
          Varattu
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-primary" />
          Valittu
        </li>
        {dateFrom ? (
          <li className="ml-auto">
            <button
              type="button"
              onClick={() => {
                onChange("", "");
                onHint?.("");
              }}
              className="rounded-lg px-2 py-1 font-medium text-foreground underline-offset-2 hover:underline"
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
