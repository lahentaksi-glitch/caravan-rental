import { SafeImage } from "@/components/ui/safe-image";
import { BookingCta } from "@/components/layout/booking-cta";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:py-20 xl:gap-20 xl:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap items-center gap-3">
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {site.partnerName} · Lahti
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Vuokraa laadukas asuntovaunu tai elämyksellinen paljuvaunu
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Premium Knaus Sport -asuntovaunu ja lämpimät paljuvaunut noudettavissa
            Lahdesta. Selkeä hinta, huolletut laitteet ja varaus muutamassa minuutissa.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookingCta
              label="Varaa asuntovaunu"
              target="caravan"
              className={bookNowClassName("min-w-[12.5rem] justify-center")}
            />
            <BookingCta
              label="Varaa palju"
              target="hottub"
              className={bookNowOutlineClassName(
                "min-w-[12.5rem] justify-center border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
              )}
            />
          </div>
        </div>

        <div className="relative w-full lg:min-h-[32rem]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_28px_60px_-20px_rgba(15,23,42,0.4)] sm:aspect-[5/4] lg:absolute lg:inset-0 lg:aspect-auto">
            <SafeImage
              src="/images/caravan/exterior-side.jpg"
              alt="Knaus Sport 500 KD -asuntovaunu Lahdessa"
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
              <span className="inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-md ring-1 ring-black/5">
                Knaus Sport 500 KD · 7,2 m
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
