import type { Metadata } from "next";
import Link from "next/link";
import { rentalTerms } from "@/data/pricing";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/kayttoehdot",
});

export default function KayttoehdotPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          align="left"
          className="max-w-3xl"
          title="Käyttöehdot"
          subtitle={`${site.name} — vuokrausehdot lyhyesti. Täydelliset ehdot toimitetaan varausvahvistuksen mukana.`}
        />

        <div className="space-y-6">
          {rentalTerms.map((term) => (
            <article key={term.title} className="rounded-2xl bg-[#F9FAFB] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-zinc-900">{term.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{term.body}</p>
            </article>
          ))}

          <article className="rounded-2xl bg-[#F9FAFB] p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-zinc-900">Vuokraaja (YTJ)</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Toiminimi: {site.legalName}
              <br />
              Y-tunnus: {site.businessId}
              <br />
              Osoite: {site.address.street}, {site.address.city}
              <br />
              Kotipaikka: {site.domicile}
              <br />
              Markkinointinimi: {site.name}
              <br />
              Sähköposti:{" "}
              <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
                {site.email}
              </a>
              <br />
              Puhelin:{" "}
              <a
                href={`tel:${site.phoneTel}`}
                className="text-accent underline-offset-2 hover:underline"
              >
                {site.phone}
              </a>
              <br />
              Yhteydenotot: {site.contactMethods}
            </p>
          </article>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Katso myös{" "}
          <Link href="/hinnasto" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
            hinnasto
          </Link>{" "}
          ja{" "}
          <Link
            href="/tietosuojaseloste"
            className="font-medium text-zinc-800 underline-offset-2 hover:underline"
          >
            tietosuojaseloste
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
