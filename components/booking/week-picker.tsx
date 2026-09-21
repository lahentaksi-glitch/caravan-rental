"use client";

import type { IsoWeekOption } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function WeekPicker({
  weeks,
  selected,
  onSelect,
  label = "Saatavuus",
}: {
  weeks: IsoWeekOption[];
  selected?: IsoWeekOption | null;
  onSelect?: (week: IsoWeekOption) => void;
  label?: string;
}) {
  return (
    <div>
      {label ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
          {label}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {weeks.map((week) => {
          const isActive = selected?.week === week.week && selected.year === week.year;
          return (
            <button
              key={`${week.year}-${week.week}`}
              type="button"
              onClick={() => onSelect?.(week)}
              className={cn(
                "min-h-11 rounded-xl px-3.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              )}
              aria-pressed={isActive}
            >
              Vk {week.week}
            </button>
          );
        })}
      </div>
    </div>
  );
}
