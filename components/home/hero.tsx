import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-primary text-primary-foreground">
      <Image
        src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=2000&q=80"
        alt="Matkailuvaunu järven rannalla ilta-auringossa"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      <Container className="relative flex min-h-[70vh] items-center py-16">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            Lahden seutu · Vuokraus
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
            <Link
              href="/tuotteet/knaus-sport-500-kd"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90"
              )}
            >
              Varaa nyt
            </Link>
            <Link
              href="/tuotteet/paljuvaunu"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
              )}
            >
              Katso saatavuus
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
