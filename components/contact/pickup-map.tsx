import Link from "next/link";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { site } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PickupMap() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl">
      <div className="relative aspect-[4/3] min-h-[16rem] bg-muted sm:min-h-[18rem]">
        <iframe
          title={`Kartta — noutopiste ${site.address.street}, Lahti`}
          src={site.mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 pointer-events-auto sm:right-auto sm:max-w-sm">
          <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur-md">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="size-4 text-accent" aria-hidden />
              Noutopiste, Lahti
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
            <a
              href={site.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-3 h-10 rounded-xl bg-accent px-3 text-accent-foreground hover:bg-accent/90"
              )}
            >
              <Navigation className="size-3.5" />
              Avaa reitti Google Mapsissa
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <p className="px-4 py-2 text-center text-xs text-muted-foreground">
        Nouto sopimuksen mukaan. Tarkka aika vahvistetaan varauksessa.{" "}
        <Link href="/hinnasto" className="underline-offset-2 hover:underline">
          Ehdot
        </Link>
      </p>
    </section>
  );
}
