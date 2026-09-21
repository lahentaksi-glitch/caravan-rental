"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type BookingTarget = "caravan" | "hottub" | "auto";

const HREFS = {
  caravan: "/tuotteet/knaus-sport-500-kd#varaa",
  hottub: "/tuotteet/paljuvaunu#varaa",
} as const;

export function BookingCta({
  label,
  target = "auto",
  className,
}: {
  label: string;
  target?: BookingTarget;
  className?: string;
}) {
  const pathname = usePathname();
  const onProduct = pathname.startsWith("/tuotteet/");

  const href =
    target === "hottub"
      ? HREFS.hottub
      : target === "caravan"
        ? HREFS.caravan
        : onProduct
          ? `${pathname}#varaa`
          : HREFS.caravan;

  return (
    <Link href={href} className={cn(className)}>
      {label}
    </Link>
  );
}
