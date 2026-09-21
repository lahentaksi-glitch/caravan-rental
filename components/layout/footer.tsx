import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { footerTermsSummary } from "@/data/pricing";
import { BrandMark } from "@/components/layout/brand-mark";
import { BookingCta } from "@/components/layout/booking-cta";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { bookNowClassName } from "@/lib/cta";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandMark />
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              {site.description}
            </p>
            <BookingCta
              label="Varaa nyt"
              className={bookNowClassName("mt-5")}
            />
          </div>
          <div>
            <p className="font-medium text-foreground">Sivut</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tuotteet/knaus-sport-500-kd#varaa" className="hover:text-foreground">
                  Asuntovaunu
                </Link>
              </li>
              <li>
                <Link href="/tuotteet/paljuvaunu#varaa" className="hover:text-foreground">
                  Paljuvaunu
                </Link>
              </li>
              <li>
                <Link href="/hinnasto" className="hover:text-foreground">Hinnasto</Link>
              </li>
              <li>
                <Link href="/yhteystiedot" className="hover:text-foreground">
                  Yhteystiedot
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground">Yhteystiedot</p>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  className="hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-white/50 bg-white/70 p-5 text-sm text-muted-foreground shadow-sm backdrop-blur-xl">
          <p className="font-medium text-foreground">Vuokrausehdot lyhyesti</p>
          <p className="mt-2">{footerTermsSummary.deductible}</p>
          <p className="mt-1">{footerTermsSummary.cancellation}</p>
          <p className="mt-2">
            <Link href="/hinnasto" className="font-medium text-foreground underline-offset-2 hover:underline">
              Lue hinnasto ja täydet ehdot
            </Link>
          </p>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} & {site.partnerName}. Kaikki oikeudet
          pidätetään.
        </p>
      </Container>
    </footer>
  );
}
