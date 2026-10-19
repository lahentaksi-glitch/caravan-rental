import { Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { site } from "@/data/site";
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
    title: "Nouto Lahti tai Pertunmaa",
    description: site.pickupNote,
  },
  {
    icon: ShieldCheck,
    title: "Kuljetus lähialueelle",
    description: site.deliveryNote,
  },
  {
    icon: Clock,
    title: "Joustavat ajat",
    description:
      "Tavanomainen vuokrausaika klo 14:00–12:00. Sesongin ulkopuolella joustamme tarpeesi mukaan.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Miksi vuokraat meiltä?"
          subtitle="Paikallinen, luotettava ja kotoisa — kesäreissuista mökkimiljöihin."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <article key={tile.title} className="rounded-2xl bg-[#F9FAFB] p-6 sm:p-7">
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-orange-50 text-accent">
                <tile.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-semibold text-zinc-900">{tile.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{tile.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
