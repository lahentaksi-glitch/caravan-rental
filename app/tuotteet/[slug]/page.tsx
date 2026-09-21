import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { faqItems } from "@/data/faq";
import { reviewsForProduct } from "@/data/reviews";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { Star } from "lucide-react";
import { getExtrasForProduct, getProductBySlug, rentalProducts } from "@/data/rentals";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecs } from "@/components/products/product-specs";
import { BookingForm } from "@/components/booking/booking-form";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { formatEuro } from "@/lib/pricing";
import { productMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { RentalSlug } from "@/types/rental";

const slugs: RentalSlug[] = ["knaus-sport-500-kd", "paljuvaunu"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Tuotetta ei löytynyt" };
  }
  return productMetadata(product);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const extras = getExtrasForProduct(product);
  const other = rentalProducts.filter((p) => p.slug !== product.slug);
  const productReviews = reviewsForProduct(product.name);
  const quote = productReviews[0];

  return (
    <div className="py-10 pb-24 sm:py-14 lg:pb-14">
      <Container>
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Murupolku">
          <Link href="/" className="hover:text-foreground">Etusivu</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.gallery} alt={product.name} />
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
            <p className="mt-6 text-2xl font-semibold text-foreground">
              {product.priceFrom.label}{" "}
              <span className="text-accent">{formatEuro(product.priceFrom.amount)}</span>
              <span className="text-base font-normal text-muted-foreground">
                /{product.priceFrom.unit}
              </span>
            </p>
            <Link
              href="/hinnasto"
              className="mt-2 inline-block text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Katso hinnasto ja ehdot
            </Link>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {product.highlights.map((h) => (
                <li key={h}>✓ {h}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#varaa"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl bg-accent px-6 text-accent-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-accent/90"
                )}
              >
                Varaa nyt
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-xl px-6 transition-transform hover:-translate-y-0.5"
                )}
              >
                Soita {site.phone}
              </a>
            </div>
            {quote ? (
              <blockquote className="mt-8 rounded-2xl border border-white/50 bg-white/60 p-4 text-sm shadow-sm backdrop-blur-md">
                <div className="mb-2 flex gap-0.5 text-accent" aria-hidden>
                  {Array.from({ length: quote.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="leading-relaxed text-foreground">&ldquo;{quote.text}&rdquo;</p>
                <footer className="mt-2 text-xs text-muted-foreground">
                  {quote.name}, {quote.location}
                </footer>
              </blockquote>
            ) : null}
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">Tekniset tiedot</h2>
          <ProductSpecs specs={product.specs} />
        </section>

        <section className="mt-16 scroll-mt-24" id="varaa">
          <BookingForm product={product} extras={extras} />
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
            Usein kysyttyä
          </h2>
          <FAQAccordion items={faqItems.slice(0, 3)} />
        </section>

        {other.length > 0 ? (
          <section className="mt-16 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Kiinnostuitko myös tästä?</h2>
            <p className="mt-2 text-muted-foreground">{other[0].shortDescription}</p>
            <Link
              href={`/tuotteet/${other[0].slug}#varaa`}
              className={buttonVariants({ className: "mt-4 rounded-xl" })}
            >
              Katso saatavuus: {other[0].name}
            </Link>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
