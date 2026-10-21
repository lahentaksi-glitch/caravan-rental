import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { footerTermsSummary } from "@/data/pricing";
import { BrandMark } from "@/components/layout/brand-mark";
import { BookingCta } from "@/components/layout/booking-cta";
import { Container } from "@/components/ui/container";
import { bookNowClassName } from "@/lib/cta";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandMark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
              {site.description}
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              <span className="font-medium text-zinc-900">{site.legalName}</span>
              <br />
              Y-tunnus {site.businessId} · Kotipaikka {site.domicile}
            </p>
            <BookingCta label="Varaa nyt" className={bookNowClassName("mt-5")} />
          </div>
          <div>
            <p className="font-semibold text-zinc-900">Sivut</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="/tuotteet/knaus-sport-500-kd" className="hover:text-zinc-800">
                  Asuntovaunu
                </Link>
              </li>
              <li>
                <Link href="/tuotteet/paljuvaunu" className="hover:text-zinc-800">
                  Paljuvaunu
                </Link>
              </li>
              <li>
                <Link href="/hinnasto" className="hover:text-zinc-800">
                  Hinnasto
                </Link>
              </li>
              <li>
                <Link href="/#ukk" className="hover:text-zinc-800">
                  UKK
                </Link>
              </li>
              <li>
                <Link href="/yhteystiedot" className="hover:text-zinc-800">
                  Ota yhteyttä
                </Link>
              </li>
              <li>
                <Link href="/kayttoehdot" className="hover:text-zinc-800">
                  Käyttöehdot
                </Link>
              </li>
              <li>
                <Link href="/tietosuojaseloste" className="hover:text-zinc-800">
                  Tietosuojaseloste
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">Yhteystiedot</p>
            <ul className="mt-3 space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <span className="font-medium text-zinc-700">
                    Palvelualue: {site.address.areaLabel}
                  </span>
                  <br />
                  Nouto: {site.address.street}
                  <br />
                  {site.address.city}
                  <br />
                  <span className="text-zinc-400">Kotipaikka: {site.domicile}</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <a href={`tel:${site.phoneTel}`} className="hover:text-zinc-800">
                    {site.phone}
                  </a>
                  <br />
                  <span className="text-zinc-400">{site.contactMethods}</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                <a
                  href={site.whatsappUrl}
                  className="hover:text-zinc-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-zinc-800">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#F9FAFB] p-5 text-sm text-zinc-500">
          <p className="font-semibold text-zinc-900">Vuokrausehdot lyhyesti</p>
          <p className="mt-2">{footerTermsSummary.deductible}</p>
          <p className="mt-1">{footerTermsSummary.cancellation}</p>
          <p className="mt-2">{site.pickupNote}</p>
          <p className="mt-1">{site.deliveryNote}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/kayttoehdot" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
              Käyttöehdot
            </Link>
            <Link href="/hinnasto" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
              Hinnasto
            </Link>
            <Link
              href="/tietosuojaseloste"
              className="font-medium text-zinc-800 underline-offset-2 hover:underline"
            >
              Tietosuojaseloste
            </Link>
            <Link href="/#ukk" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
              UKK
            </Link>
            <Link href="/yhteystiedot" className="font-medium text-zinc-800 underline-offset-2 hover:underline">
              Ota yhteyttä
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} {site.legalName} · {site.name} · Y-tunnus {site.businessId}.
          Kaikki oikeudet pidätetään.
        </p>
      </Container>
    </footer>
  );
}
