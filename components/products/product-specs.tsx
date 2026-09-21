import { Gauge } from "lucide-react";
import { specIconMap } from "@/lib/spec-icons";
import type { RentalSpec } from "@/types/rental";

export function ProductSpecs({ specs }: { specs: RentalSpec[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {specs.map((spec) => {
        const Icon = specIconMap[spec.icon] ?? Gauge;
        return (
          <li
            key={spec.label}
            className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#F9FAFB] text-accent ring-1 ring-gray-100">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {spec.label}
              </p>
              <p className="mt-0.5 font-semibold text-foreground">{spec.value}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
