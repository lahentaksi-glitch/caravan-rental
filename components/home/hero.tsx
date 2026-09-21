import { SafeImage } from "@/components/ui/safe-image";
import { BookingCta } from "@/components/layout/booking-cta";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100/80 via-background to-accent/10"
        aria-hidden
      />
      <Container className="relative grid min-h-[min(82vh,52rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-20">
        <div className="order-1 max-w-xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {site.name} · {site.partnerName}
          </p>
          <h1 className="bg-gradient-to-r from-primary via-[#16315e] to-accent bg-clip-text text-4xl font-extrabold leading-[1.08] tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Vuokraa laadukas asuntovaunu tai elämyksellinen paljuvaunu
          </h1>
          <p className="mt-4 text-sm font-medium tracking-wide text-primary/80 sm:text-base">
            Helppoa laatua — nouto Lahdelta, huolletut laitteet, selkeä hinta.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Valitse vapaat päivät, lähetä varauspyyntö WhatsAppilla ja lähde
            matkaan ilman turhaa säätöä.
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

        <div className="order-2 mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
          <div className="relative mx-auto aspect-[4/3] w-[min(100%,28rem)] overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_28px_60px_-28px_rgba(20,40,80,0.55)] lg:w-[min(100%,32rem)]">
            <SafeImage
              src="/images/caravan/exterior-side.jpg"
              alt="Knaus Sport 500 KD -asuntovaunu Lahdessa"
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 32rem"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-white/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
