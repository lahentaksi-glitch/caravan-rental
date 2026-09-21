import { BookingCta } from "@/components/layout/booking-cta";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConversionCta({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-white/80 to-white/60 p-6 shadow-[0_18px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <BookingCta
          label="Varaa asuntovaunu"
          target="caravan"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 rounded-xl bg-accent px-6 text-accent-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-accent/90"
          )}
        />
        <BookingCta
          label="Varaa paljuvaunu"
          target="hottub"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 rounded-xl px-6 transition-transform hover:-translate-y-0.5"
          )}
        />
      </div>
    </div>
  );
}
