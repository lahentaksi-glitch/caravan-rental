import { Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const tiles = [
  {
    icon: Sparkles,
    title: "Puhtaat ja huolletut laitteet",
    description:
      "Jokainen vuokra käy läpi tarkistuksen ja perussiivouksen ennen luovutusta.",
  },
  {
    icon: MapPin,
    title: "Helppo nouto/toimitus Lahden alueella",
    description:
      "Nouto varastoltamme tai toimitus lähialueelle — sovitaan varauksen yhteydessä.",
  },
  {
    icon: ShieldCheck,
    title: "Täysi varustelu",
    description:
      "Mukana oleva perusvarustelu, selkeät ohjeet ja tuki puhelimella koko vuokrauksen ajan.",
  },
  {
    icon: Clock,
    title: "Joustavat ajat",
    description:
      "Sesongin ulkopuolella joustamme nouto- ja palautusaikoihin tarpeesi mukaan.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-[#F9FAFB] py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Miksi vuokraat meiltä?"
          subtitle="Paikallinen, luotettava kumppani — kesäreissuista mökkimiljöihin."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <article
              key={tile.title}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <tile.icon className="size-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{tile.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tile.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
