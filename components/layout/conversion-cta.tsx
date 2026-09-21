import { BookingCta } from "@/components/layout/booking-cta";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";

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
          className={bookNowClassName()}
        />
        <BookingCta
          label="Varaa paljuvaunu"
          target="hottub"
          className={bookNowOutlineClassName()}
        />
      </div>
    </div>
  );
}
