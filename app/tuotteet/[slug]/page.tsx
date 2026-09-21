import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { faqItems } from "@/data/faq";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { getExtrasForProduct, getProductBySlug, rentalProducts } from "@/data/rentals";
import { PaljuPriceBoard } from "@/components/products/palju-price-board";
import { ProductEquipment } from "@/components/products/product-equipment";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecs } from "@/components/products/product-specs";
import { hotTubRates, hotTubTrust } from "@/data/pricing";
import { BookingForm } from "@/components/booking/booking-form";
import { Container } from "@/components/ui/container";
import { formatEuro } from "@/lib/pricing";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";
import { pageMetadata, productMetadata } from "@/lib/seo";
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
    return pageMetadata({ path: "/", noIndex: true });
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
  const categoryLabel = product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu";
  const index = rentalProducts.findIndex((item) => item.slug === product.slug);
  const caption = `${String(index + 1).padStart(2, "0")} / ${product.name}`;
  const chips = product.highlights.slice(0, 3);

  return (
    <div className="pb-24 lg:pb-0">
      <section className="bg-[#F9FAFB] py-8 sm:py-12">
        <Container>
          <nav className="mb-6 text-sm text-zinc-400" aria-label="Murupolku">
            <Link href="/" className="hover:text-zinc-700">
              Etusivu
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-700">{product.name}</span>
          </nav>

          <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
            <ProductGallery images={product.gallery} alt={product.name} caption={caption} />
            <div className="flex flex-col justify-center rounded-2xl bg-white p-6 sm:p-8 lg:p-10">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {categoryLabel}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg">
                {product.shortDescription}
              </p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-zinc-900">
                  {formatEuro(product.nightlyRate)}
                </span>
                <span className="text-sm text-zinc-400">/ vrk · alkaen</span>
              </p>
              {product.category === "hot-tub" ? (
                <p className="mt-2 text-sm text-zinc-500">
                  Viikonloppu (pe–su){" "}
                  <span className="font-semibold text-accent">{formatEuro(product.weekendRate)}</span>
                  {" · "}ma–to pätkä{" "}
                  <span className="font-semibold text-accent">
                    {formatEuro(hotTubRates.weekdayStretch)}
                  </span>
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#varaa" className={bookNowClassName("justify-center gap-2")}>
                  Varaamaan
                  <ArrowRight className="size-4" aria-hidden />
                </a>
                <a href="#tekniset" className={bookNowOutlineClassName("justify-center")}>
                  Katso tekniset tiedot
                </a>
              </div>
              <p className="mt-6 text-sm text-zinc-400">{chips.join("  ·  ")}</p>
              {product.category === "hot-tub" ? (
                <p className="mt-4 rounded-xl bg-orange-50 px-3 py-2 text-sm leading-relaxed text-zinc-700">
                  {hotTubTrust.cleanliness}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section id="tekniset" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Tekniset tiedot
          </h2>
          <p className="mt-3 max-w-2xl text-base text-zinc-500">
            Keskeiset mitat ja varusteet — kaikki mitä tarvitset valintaan.
          </p>
          <div className="mt-8">
            <ProductSpecs specs={product.specs} />
          </div>
          <h2 className="mt-14 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Varustelu
          </h2>
          <div className="mt-8">
            <ProductEquipment items={product.highlights} />
          </div>
        </Container>
      </section>

      {product.category === "hot-tub" ? (
        <section id="hinnasto" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <Container className="max-w-3xl">
            <PaljuPriceBoard />
          </Container>
        </section>
      ) : null}

      <section className="scroll-mt-24 bg-[#F9FAFB] py-16 sm:py-20" id="varaa">
        <Container>
          <BookingForm product={product} extras={extras} />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <h2 className="mb-8 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Usein kysyttyä
            </h2>
            <FAQAccordion items={faqItems.slice(0, 3)} />
          </div>
          {other.length > 0 ? (
            <aside className="mt-12 rounded-2xl bg-[#F9FAFB] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {other[0].category === "caravan" ? "Asuntovaunu" : "Paljuvaunu"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                {other[0].name}
              </h2>
              <p className="mt-2 max-w-2xl text-zinc-500">{other[0].shortDescription}</p>
              <Link
                href={`/tuotteet/${other[0].slug}`}
                className={bookNowOutlineClassName("mt-5")}
              >
                Katso tekniset tiedot
              </Link>
            </aside>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
