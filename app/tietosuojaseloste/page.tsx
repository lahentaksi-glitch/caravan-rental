import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/tietosuojaseloste",
});

const sections = [
  {
    title: "Rekisterinpitäjä",
    body: `${site.legalName} (Y-tunnus ${site.businessId}) / ${site.name}, ${site.address.street}, ${site.address.city}. Kotipaikka ${site.domicile}. Yhteydenotot: ${site.email}.`,
  },
  {
    title: "Mitä tietoja keräämme",
    body: "Varaus- ja yhteydenottolomakkeilla keräämme nimen, sähköpostin, puhelinnumeron sekä viestin sisällön. Lisäksi sivusto voi kerätä teknisiä lokitietoja (esim. IP-osoite, selain) palvelun toiminnan ja turvallisuuden varmistamiseksi.",
  },
  {
    title: "Mihin tietoja käytetään",
    body: "Tietoja käytetään vain varauspyyntöjen käsittelyyn, asiaksiin yhteydenottoihin ja palvelun kehittämiseen. Emme myy henkilötietoja kolmansille osapuolille.",
  },
  {
    title: "Säilytysaika",
    body: "Varauksiin liittyviä tietoja säilytetään niin kauan kuin se on tarpeen varauksen hoitamiseksi, kirjanpidollisten velvoitteiden täyttämiseksi tai mahdollisten reklamaatioiden selvittämiseksi.",
  },
  {
    title: "Oikeutesi",
    body: "Sinulla on oikeus pyytää pääsyä tietoihisi, korjata niitä tai pyytää poistamista soveltuvan lainsäädännön puitteissa. Ota yhteyttä sähköpostitse.",
  },
] as const;

export default function TietosuojaselostePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          align="left"
          className="max-w-3xl"
          title="Tietosuojaseloste"
          subtitle="Näin käsittelemme henkilötietojasi Paljuvuokraus Lahden palveluissa."
        />

        <div className="space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl bg-[#F9FAFB] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-zinc-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{section.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Kysyttävää tietosuojasta?{" "}
          <Link href="/yhteystiedot" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
            Ota yhteyttä
          </Link>{" "}
          tai kirjoita osoitteeseen{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-accent underline-offset-2 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Container>
    </div>
  );
}
