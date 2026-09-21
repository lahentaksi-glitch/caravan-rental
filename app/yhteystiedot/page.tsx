import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Yhteystiedot | Lahden Vaunu & Palju",
  description: "Ota yhteyttä, aukioloajat ja sijainti Lahdessa.",
};

export default function YhteystiedotPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          align="left"
          className="max-w-2xl"
          title="Yhteystiedot"
          subtitle="Autamme varauksissa ja kysymyksissä — soita, lähetä sähköpostia tai täytä lomake."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl">
              <h2 className="font-semibold text-foreground">Asiakaspalvelu</h2>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.country}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-accent" aria-hidden />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                  <a href={`mailto:${site.email}`} className="hover:text-foreground">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-4 shrink-0 text-accent" aria-hidden />
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                    className="hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl">
              <h2 className="flex items-center gap-2 font-semibold text-foreground">
                <Clock className="size-4 text-accent" aria-hidden />
                Aukioloajat
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{site.hours.weekdays}</p>
              <p className="mt-1 text-sm text-muted-foreground">{site.hours.weekend}</p>
              <p className="mt-3 text-xs text-muted-foreground">{site.hours.note}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/50 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)]">
              <iframe
                title="Kartta — Lahti"
                src={site.mapEmbedUrl}
                className="h-64 w-full border-0 bg-muted sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="px-4 py-2 text-center text-xs text-muted-foreground">
                Kartta on esimerkki — tarkka osoite vahvistetaan varauksessa.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Lähetä viesti</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
