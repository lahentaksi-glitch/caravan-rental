import Link from "next/link";
import { Droplets, ShieldCheck, Sparkles } from "lucide-react";
import { hotTubTrust } from "@/data/pricing";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";
import { Container } from "@/components/ui/container";

const points = [
  {
    icon: Sparkles,
    title: "Pesu jokaisen vuokran jälkeen",
    body: "Palju tyhjennetään, huuhdellaan ja pestään huolellisesti ennen seuraavaa luovutusta.",
  },
  {
    icon: Droplets,
    title: "Desinfiointi",
    body: "Pinnat desinfioidaan, jotta saat aina puhtaan ja turvallisen löylykokemuksen.",
  },
  {
    icon: ShieldCheck,
    title: "Puhtaustakuu",
    body: hotTubTrust.cleanliness,
  },
] as const;

export function CleanlinessGuarantee() {
  return (
    <section id="puhtaustakuu" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Luottamus
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Puhtaustakuu
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
              Jokainen palju pestään ja desinfioidaan huolellisesti jokaisen vuokrauksen jälkeen —
              saat laitteen priimakunnossa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tuotteet/paljuvaunu#varaa"
                className={bookNowClassName("justify-center gap-2")}
              >
                Varaa palju
              </Link>
              <Link
                href="/yhteystiedot"
                className={bookNowOutlineClassName(
                  "justify-center border-accent/40 text-accent hover:bg-orange-50 hover:text-accent"
                )}
              >
                Pyydä tarjous
              </Link>
            </div>
          </div>

          <ul className="space-y-4">
            {points.map((point) => (
              <li
                key={point.title}
                className="flex gap-4 rounded-2xl border border-orange-100 bg-orange-50/50 p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <point.icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-zinc-900">{point.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-zinc-600">
                    {point.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
