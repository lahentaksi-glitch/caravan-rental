import {
  BedDouble,
  Car,
  Clock,
  Droplets,
  Flame,
  Gauge,
  Ruler,
  Sparkles,
  Thermometer,
  Users,
  Weight,
} from "lucide-react";
import type { ComponentType } from "react";
import type { RentalSpec } from "@/types/rental";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  weight: Weight,
  plate: Car,
  bed: BedDouble,
  thermometer: Thermometer,
  car: Car,
  mirror: Car,
  ruler: Ruler,
  users: Users,
  flame: Flame,
  sparkles: Sparkles,
  clock: Clock,
  droplets: Droplets,
  gauge: Gauge,
};

export function ProductSpecs({ specs }: { specs: RentalSpec[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {specs.map((spec) => {
        const Icon = iconMap[spec.icon] ?? Gauge;
        return (
          <li
            key={spec.label}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
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
