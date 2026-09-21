import type { Metadata } from "next";
import {
  caravanPricingTable,
  hotTubPricingTable,
  rentalTerms,
} from "@/data/pricing";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Hinnasto | Lahden Vaunu & Palju",
  description: "Kausi- ja sesonkihinnat asuntovaunulle ja paljuvaunulle sekä vuokrausehdot.",
};

function PricingTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; season: string; offSeason: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-[0_18px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl">
      <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-4 py-3 font-medium sm:px-6">Jakso</th>
              <th className="px-4 py-3 font-medium sm:px-6">Kausi (kesä)</th>
              <th className="px-4 py-3 font-medium sm:px-6">Sesongin ulkopuoli</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground sm:px-6">{row.label}</td>
                <td className="px-4 py-3 text-foreground sm:px-6">{row.season}</td>
                <td className="px-4 py-3 text-muted-foreground sm:px-6">{row.offSeason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HinnastoPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          align="left"
          className="max-w-3xl"
          title="Hinnasto"
          subtitle="Läpinäkyvät hinnat kausi- ja sesonkiajoille. Kausi = kesäkuu–elokuu; sesongin ulkopuoli = muut kuukaudet."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <PricingTable title="Matkailuvaunu Knaus Sport 500 KD" rows={caravanPricingTable} />
          <PricingTable title="Paljuvaunu" rows={hotTubPricingTable} />
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-foreground">Vuokrausehdot (lyhyesti)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {rentalTerms.map((term) => (
              <article
                key={term.title}
                className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl"
              >
                <h3 className="font-semibold text-foreground">{term.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{term.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Täydelliset ehdot toimitetaan varausvahvistuksen mukana. Kysyttävää?{" "}
            <a href="/yhteystiedot" className="text-primary underline-offset-2 hover:underline">
              Ota yhteyttä
            </a>
            .
          </p>
        </section>
      </Container>
    </div>
  );
}
