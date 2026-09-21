import Image from "next/image";
import { BookingCta } from "@/components/layout/booking-cta";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-primary text-primary-foreground">
      <Image
        src="/images/caravan/exterior-side.jpg"
        alt="Knaus Sport 500 KD -asuntovaunu Lahdessa"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
      <Container className="relative flex min-h-[78vh] items-center py-16">
        <div className="max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_30px_80px_-32px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Image
              src={site.logos.caravan}
              alt={site.name}
              width={56}
              height={56}
              className="size-12 rounded-xl object-cover shadow-md"
            />
            <Image
              src={site.logos.palju}
              alt={site.partnerName}
              width={200}
              height={44}
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            {site.name} · {site.partnerName}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
            Vuokraa laadukas asuntovaunu tai elämyksellinen paljuvaunu
          </h1>
          <p className="mt-5 text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Huolletut laitteet, selkeät hinnat ja henkilökohtainen palvelu. Aloita
            seuraava seikkailusi tai rentoutumisiltasi — nouto Lahdelta tai toimitus
            lähialueelle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookingCta
              label="Varaa nyt"
              target="caravan"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-xl bg-accent px-6 text-base text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-accent/90"
              )}
            />
            <BookingCta
              label="Katso saatavuus"
              target="hottub"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-xl border-primary-foreground/30 bg-primary-foreground/10 px-6 text-base text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-primary-foreground/20"
              )}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
