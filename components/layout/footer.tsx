import Link from "next/link";
import { site } from "@/data/site";
import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-white">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark />
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} {site.name} · Hinnat sisältävät arvonlisäveron
        </p>
        <nav className="flex flex-wrap gap-5 text-sm text-zinc-500" aria-label="Alatunniste">
          <Link href="/yhteystiedot" className="hover:text-zinc-800">
            Yhteys
          </Link>
          <Link href="/hinnasto" className="hover:text-zinc-800">
            Ehdot
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-zinc-800">
            {site.email}
          </a>
        </nav>
      </Container>
    </footer>
  );
}
