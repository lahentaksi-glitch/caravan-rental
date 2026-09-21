import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { faqItems } from "@/data/faq";
import { reviewsForProduct } from "@/data/reviews";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { ReviewQuote } from "@/components/ui/review-quote";
import { getExtrasForProduct, getProductBySlug, rentalProducts } from "@/data/rentals";
import { ProductEquipment } from "@/components/products/product-equipment";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecs } from "@/components/products/product-specs";
import { BookingForm } from "@/components/booking/booking-form";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
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
  const productReviews = reviewsForProduct(product.name);
  const quote = productReviews[0];
  const categoryLabel = product.category === "caravan" ? "Matkailuvaunu" : "Paljuvaunu";

  return (
    <div className="pb-24 lg:pb-0">
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <nav className="mb-8 text-sm text-muted-foreground" aria-label="Murupolku">
            <Link href="/" className="hover:text-foreground">
              Etusivu
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.gallery} alt={product.name} />
            <div>
              <span className="inline-flex rounded-full bg-[#F9FAFB] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-gray-100">
                {categoryLabel}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {product.shortDescription}
              </p>
              <div className="mt-8 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5">
                <p className="text-sm font-medium text-muted-foreground">Hinta</p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
                  alkaen{" "}
                  <span className="text-accent">{formatEuro(product.nightlyRate)}</span>
                  <span className="text-lg font-normal text-muted-foreground"> / vrk</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Viikonloppu {formatEuro(product.weekendRate)} · viikko {formatEuro(product.weeklyRate)}
                </p>
                <Link
                  href="/hinnasto"
                  className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                >
                  Katso hinnasto ja ehdot
                </Link>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#varaa" className={bookNowClassName("justify-center")}>
                  Varaa nyt
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className={bookNowOutlineClassName(
                    "justify-center border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  Soita {site.phone}
                </a>
              </div>
              {quote ? <ReviewQuote review={quote} className="mt-8" /> : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F9FAFB] py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Tekniset tiedot
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Keskeiset mitat ja varusteet — kaikki mitä tarvitset valintaan.
          </p>
          <div className="mt-8">
            <ProductSpecs specs={product.specs} />
          </div>
          <h2 className="mt-14 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Varustelu
          </h2>
          <div className="mt-8">
            <ProductEquipment items={product.highlights} />
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 bg-[#F9FAFB] py-16 sm:py-20" id="varaa">
        <Container>
          <BookingForm product={product} extras={extras} />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Usein kysyttyä
            </h2>
            <FAQAccordion items={faqItems.slice(0, 3)} />
          </div>
          {other.length > 0 ? (
            <aside className="mt-12 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-6 shadow-md sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {other[0].category === "caravan" ? "Matkailuvaunu" : "Paljuvaunu"}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground">
                Kiinnostuitko myös tästä?
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">{other[0].shortDescription}</p>
              <Link
                href={`/tuotteet/${other[0].slug}#varaa`}
                className={buttonVariants({
                  className: "mt-5 h-12 rounded-xl bg-accent px-6 text-accent-foreground hover:bg-accent/90",
                })}
              >
                Katso saatavuus: {other[0].name}
              </Link>
            </aside>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
