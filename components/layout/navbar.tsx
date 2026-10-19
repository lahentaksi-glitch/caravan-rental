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
  { href: "/#valikoima", label: "Valikoima" },
  { href: "/#varaa", label: "Varaus" },
  { href: "/hinnasto", label: "Hinnasto" },
  { href: "/yhteystiedot", label: "Yhteys" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#F9FAFB]/90 backdrop-blur-md">
      <Container className="flex h-[4.5rem] items-center justify-between gap-3">
        <BrandMark compact />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Päävalikko">
          {links.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <BookingCta
            label="Varaa palju"
            target="hottub"
            className={bookNowClassName("hidden h-11 rounded-full sm:inline-flex")}
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
                <SheetTitle>{site.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobiilivalikko">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <BookingCta
                  label="Varaa palju"
                  target="hottub"
                  className={bookNowClassName("mt-4 w-full justify-center")}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
