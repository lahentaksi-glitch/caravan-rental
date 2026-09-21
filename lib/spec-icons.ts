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

export const specIconMap: Record<string, ComponentType<{ className?: string }>> = {
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
