import Link from "next/link";
import { rentalProducts } from "@/data/rentals";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/ui/container";

export function CatalogSection() {
  return (
    <section id="valikoima" className="scroll-mt-24 bg-[#F9FAFB] py-14 sm:py-20">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Valitse vuokrakohteesi
          </h2>
          <p className="mt-3 text-base text-zinc-500 sm:text-lg">
            Kaksi huippuluokan vaihtoehtoa — perhematkailuun tai rentoutumiseen luonnon keskellä.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {rentalProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/hinnasto" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
            Katso koko hinnasto
          </Link>
        </p>
      </Container>
    </section>
  );
}
