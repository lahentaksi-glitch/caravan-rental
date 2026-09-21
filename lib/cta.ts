import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function bookNowClassName(className?: string) {
  return cn(
    buttonVariants({ size: "lg" }),
    "h-12 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-none transition-all duration-200 hover:bg-accent/90 hover:text-white active:scale-[0.98]",
    className
  );
}

export function bookNowOutlineClassName(className?: string) {
  return cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-12 rounded-xl border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-800 shadow-none transition-all duration-200 hover:bg-zinc-50 active:scale-[0.98]",
    className
  );
}

export function charcoalClassName(className?: string) {
  return cn(
    buttonVariants({ size: "lg" }),
    "h-11 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-none hover:bg-zinc-800 hover:text-white",
    className
  );
}
