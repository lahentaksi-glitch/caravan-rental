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
    <div className="rounded-2xl bg-[#F9FAFB] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">{subtitle}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <BookingCta
          label="Varaamaan"
          target="hottub"
          className={bookNowClassName("gap-2")}
        />
        <BookingCta
          label="Katso tekniset tiedot"
          target="caravan"
          className={bookNowOutlineClassName()}
        />
      </div>
    </div>
  );
}
