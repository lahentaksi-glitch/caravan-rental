import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <Link
          href="/tuotteet/paljuvaunu#varaa"
          className={bookNowClassName("justify-center gap-2")}
        >
          Varaamaan
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/tuotteet/knaus-sport-500-kd#tekniset"
          className={bookNowOutlineClassName("justify-center")}
        >
          Katso tekniset tiedot
        </Link>
      </div>
    </div>
  );
}
