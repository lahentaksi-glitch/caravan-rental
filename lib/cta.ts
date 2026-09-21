import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function bookNowClassName(className?: string) {
  return cn(
    buttonVariants({ size: "lg" }),
    "h-14 rounded-xl bg-accent px-7 text-base font-semibold text-accent-foreground shadow-[0_12px_28px_-8px_oklch(0.68_0.16_55/0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_16px_36px_-10px_oklch(0.68_0.16_55/0.65)] active:scale-95",
    className
  );
}

export function bookNowOutlineClassName(className?: string) {
  return cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-14 rounded-xl px-7 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95",
    className
  );
}
