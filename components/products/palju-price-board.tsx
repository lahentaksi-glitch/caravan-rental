import { Droplets, Flame, Sparkles, Truck } from "lucide-react";
import { getExtrasForProduct, getProductBySlug } from "@/data/rentals";
import { hotTubPricingRows, hotTubRates, hotTubTrust } from "@/data/pricing";
import { formatEuro } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PaljuPriceBoard({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const product = getProductBySlug("paljuvaunu");
  const extras = product ? getExtrasForProduct(product) : [];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-[0_18px_50px_rgba(234,106,31,0.08)]",
        className
      )}
    >
      <div className="bg-gradient-to-r from-accent to-orange-400 px-5 py-4 text-white sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          Paljuvaunu
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Hinnasto</h3>
        <p className="mt-1 text-sm text-white/90">
          alkaen {formatEuro(hotTubRates.weekdayNight)} / vrk · viikonloppupaketti{" "}
          {formatEuro(hotTubRates.weekendPackage)}
        </p>
      </div>

      <ul className="divide-y divide-orange-50">
        {hotTubPricingRows.map((row) => (
          <li
            key={row.label}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-6"
          >
            <div>
              <p className="font-semibold text-zinc-900">{row.label}</p>
              {compact ? null : (
                <p className="mt-0.5 text-sm text-zinc-500">{row.note}</p>
              )}
            </div>
            <p className="shrink-0 text-base font-semibold text-accent">{row.value}</p>
          </li>
        ))}
      </ul>

      {extras.length > 0 ? (
        <div className="border-t border-orange-100 bg-orange-50/40 px-5 py-5 sm:px-6">
          <p className="text-sm font-semibold text-zinc-900">Lisäpalvelut</p>
          <ul className="mt-3 space-y-3">
            {extras.map((extra) => {
              const Icon =
                extra.id === "polttopuut"
                  ? Flame
                  : extra.id === "toimitus"
                    ? Truck
                    : Droplets;
              return (
                <li key={extra.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-sm">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium text-zinc-900">{extra.label}</span>
                      <span className="font-semibold text-accent">
                        {extra.priceFrom
                          ? `alkaen ${formatEuro(extra.price)}`
                          : formatEuro(extra.price)}
                      </span>
                    </span>
                    {extra.description ? (
                      <span className="mt-0.5 block text-zinc-500">{extra.description}</span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="space-y-3 border-t border-orange-100 px-5 py-5 sm:px-6">
        <p className="flex gap-2 text-sm leading-relaxed text-zinc-700">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          <span>{hotTubTrust.cleanliness}</span>
        </p>
        <p className="text-sm leading-relaxed text-zinc-500">{hotTubTrust.hours}</p>
        <p className="text-sm leading-relaxed text-zinc-500">{hotTubTrust.pickup}</p>
        <p className="text-sm leading-relaxed text-zinc-500">{hotTubTrust.delivery}</p>
      </div>
    </div>
  );
}
