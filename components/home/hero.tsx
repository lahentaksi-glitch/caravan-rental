import { SafeImage } from "@/components/ui/safe-image";
import { BookingCta } from "@/components/layout/booking-cta";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden bg-primary">
      <SafeImage
        src="/images/caravan/exterior-side.jpg"
        alt="Knaus Sport 500 KD -asuntovaunu Lahdessa"
        fill
        priority
        quality={90}
        className="scale-105 object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/25 to-accent/20" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <Container className="relative flex min-h-[82vh] items-center py-16">
        <div
          className={cn(
            "max-w-2xl rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_-24px_rgba(20,40,80,0.55)]",
            "backdrop-blur-2xl sm:bg-sky-50/70 sm:p-10"
          )}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <SafeImage
              src={site.logos.caravan}
              alt={site.name}
              width={56}
              height={56}
              className="size-12 rounded-xl object-cover shadow-md"
            />
            <SafeImage
              src={site.logos.palju}
              alt={site.partnerName}
              width={200}
              height={44}
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {site.name} · {site.partnerName}
          </p>
          <h1 className="bg-gradient-to-r from-primary via-[#1e3a6e] to-accent bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl lg:leading-[1.12]">
            Vuokraa laadukas asuntovaunu tai elämyksellinen paljuvaunu
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Huolletut laitteet, selkeät hinnat ja henkilökohtainen palvelu. Aloita
            seuraava seikkailusi tai rentoutumisiltasi — nouto Lahdelta tai toimitus
            lähialueelle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookingCta
              label="Varaa asuntovaunu"
              target="caravan"
              className={bookNowClassName()}
            />
            <BookingCta
              label="Varaa paljuvaunu"
              target="hottub"
              className={bookNowOutlineClassName(
                "border-primary/20 bg-white/80 text-primary hover:bg-white"
              )}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
