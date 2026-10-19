"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WeekPicker } from "@/components/booking/week-picker";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { rentalProducts } from "@/data/rentals";
import { charcoalClassName } from "@/lib/cta";
import { upcomingWeeks, type IsoWeekOption } from "@/lib/dates";

export function BookingTeaser() {
  const weeks = useMemo(() => upcomingWeeks(4), []);
  const [selected, setSelected] = useState<IsoWeekOption>(weeks[1] ?? weeks[0]);
  const featured =
    rentalProducts.find((product) => product.slug === "paljuvaunu") ?? rentalProducts[0];
  const specs = featured.highlights.slice(0, 4);

  return (
    <section id="varaa" className="scroll-mt-24 bg-[#F9FAFB] py-10 sm:py-16">
      <Container>
        <div className="grid gap-8 rounded-2xl bg-zinc-100/80 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              03 / Varaus
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Aloita vuokraus
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500">
              Valitse viikko ja nouda {featured.name.toLowerCase()} Lahdesta. Hinta sisältää
              perusvarusteet ja selkeät käyttöohjeet.
            </p>
            <Link
              href={`/tuotteet/${featured.slug}#varaa`}
              className={charcoalClassName("mt-8 w-fit gap-2")}
            >
              Avaa varauskalenteri
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5">
              <WeekPicker weeks={weeks} selected={selected} onSelect={setSelected} />
              <p className="mt-3 text-xs text-zinc-400">
                {featured.name} · valittu viikko {selected.week}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Nouto
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Nouda sovittuna aikana {site.address.street}, {site.address.city}. Palvelualue{" "}
                {site.address.areaLabel}. Saat tarkan ohjeen varauksen vahvistuksessa.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Tekniset tiedot
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{specs.join(" · ")}</p>
            </div>
            <div className="rounded-2xl bg-zinc-900 p-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Varaus
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-200">
                Varaus vahvistetaan ennen noutoa. Peruutusehdot näet varauksen yhteydessä.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
