import { Gauge } from "lucide-react";
import { specIconMap } from "@/lib/spec-icons";
import type { RentalSpec } from "@/types/rental";

export function ProductSpecs({ specs }: { specs: RentalSpec[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {specs.map((spec) => {
        const Icon = specIconMap[spec.icon] ?? Gauge;
        return (
          <li
            key={spec.label}
            className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm transition-colors duration-200 hover:border-slate-200 hover:bg-slate-50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-accent">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">{spec.label}</p>
              <p className="font-medium text-foreground">{spec.value}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
