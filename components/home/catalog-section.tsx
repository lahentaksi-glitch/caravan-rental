import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rentalProducts } from "@/data/rentals";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/ui/container";

export function CatalogSection() {
  return (
    <section id="valikoima" className="scroll-mt-24 bg-[#F9FAFB] py-8 sm:py-12">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              02 / Valikoima
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Koko valikoima
            </h2>
          </div>
          <Link
            href="/hinnasto"
            className="hidden items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 sm:inline-flex"
          >
            Näytä kaikki
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {rentalProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
              featured={product.slug === "paljuvaunu"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
