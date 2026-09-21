"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { site } from "@/data/site";
import { BrandMark } from "@/components/layout/brand-mark";
import { BookingCta } from "@/components/layout/booking-cta";
import { bookNowClassName } from "@/lib/cta";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Etusivu" },
  { href: "/tuotteet/knaus-sport-500-kd", label: "Asuntovaunu" },
  { href: "/tuotteet/paljuvaunu", label: "Paljuvaunu" },
  { href: "/hinnasto", label: "Hinnasto" },
  { href: "/yhteystiedot", label: "Yhteystiedot" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-background/65 shadow-sm backdrop-blur-xl">
      <Container className="flex h-[4.25rem] items-center justify-between gap-3">
        <BrandMark compact />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Päävalikko">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-white/70 hover:shadow-sm",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BookingCta
            label="Varaa"
            className={bookNowClassName("h-11 min-h-11 px-4 text-sm sm:px-5")}
          />

          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-xl lg:hidden")}
              aria-label="Avaa valikko"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle>
                  {site.name}
                  <span className="mt-1 block text-sm font-normal text-muted-foreground">
                    {site.partnerName}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobiilivalikko">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base font-medium hover:bg-muted",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <BookingCta
                  label="Varaa nyt"
                  className={bookNowClassName("mt-4 w-full")}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
