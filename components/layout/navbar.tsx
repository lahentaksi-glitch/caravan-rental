"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Mountain } from "lucide-react";
import { site } from "@/data/site";
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Mountain className="size-5" aria-hidden />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm">{site.name}</span>
            <span className="block text-xs font-normal text-muted-foreground">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Päävalikko">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tuotteet/knaus-sport-500-kd"
            className={cn(
              buttonVariants({ size: "default" }),
              "hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex"
            )}
          >
            Varaa nyt
          </Link>

          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")}
              aria-label="Avaa valikko"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobiilivalikko">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium hover:bg-muted",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/tuotteet/paljuvaunu"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                  )}
                >
                  Katso saatavuus
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
