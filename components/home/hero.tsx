import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Container } from "@/components/ui/container";
import { rentalProducts } from "@/data/rentals";
import { formatEuro } from "@/lib/pricing";
import { bookNowClassName, quoteCtaClassName } from "@/lib/cta";

export function Hero() {
  const featured =
    rentalProducts.find((product) => product.slug === "paljuvaunu") ?? rentalProducts[0];
  const chips = featured.highlights.slice(0, 3);

  return (
    <section className="bg-[#F9FAFB] pt-4 pb-8 sm:pt-6 sm:pb-10">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl sm:min-h-[28rem] lg:min-h-[36rem]">
            <SafeImage
              src={featured.heroImage}
              alt={`${featured.name} — paljun vuokraus Lahti ja Pertunmaa`}
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm sm:left-5 sm:top-5">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              Saatavilla heti
            </span>
            <span className="absolute bottom-4 left-4 rounded-lg bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-white sm:bottom-5 sm:left-5">
              01 / {featured.name}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white p-6 sm:p-8 lg:p-10">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Paljun vuokraus Lahti · Pertunmaa
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.4rem]">
              {featured.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg">
              {featured.shortDescription} Kärrypalju vuokraus Päijät-Hämeessä — nouto Lahdesta tai
              Pertunmaalta.
            </p>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                {formatEuro(featured.nightlyRate)}
              </span>
              <span className="text-sm text-zinc-400">/ vrk · alkaen</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Viikonloppu (pe–su){" "}
              <span className="font-semibold text-accent">{formatEuro(featured.weekendRate)}</span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/tuotteet/${featured.slug}#varaa`}
                className={bookNowClassName("justify-center gap-2 shadow-lg shadow-orange-200/60")}
              >
                Varaa palju
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/yhteystiedot" className={quoteCtaClassName("justify-center")}>
                Pyydä tarjous
              </Link>
            </div>
            <p className="mt-6 text-sm text-zinc-400">{chips.join("  ·  ")}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 text-sm text-zinc-400">
          <p className="flex min-w-0 items-center gap-3">
            <span className="hidden h-px w-10 bg-zinc-300 sm:block" aria-hidden />
            Seuraava — koko valikoima
          </p>
          <a href="#valikoima" className="inline-flex items-center gap-1.5 hover:text-zinc-700">
            Valikoima alkaa alta
            <ArrowDown className="size-3.5" aria-hidden />
          </a>
        </div>
      </Container>
    </section>
  );
}
