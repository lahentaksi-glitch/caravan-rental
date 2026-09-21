import type { Metadata } from "next";
import Link from "next/link";
import { rentalProducts } from "@/data/rentals";
import { faqItems } from "@/data/faq";
import { reviews } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { WhyUs } from "@/components/home/why-us";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ProductCard } from "@/components/products/product-card";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrustStrip } from "@/components/trust/trust-strip";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = pageMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-y border-gray-100 bg-[#F9FAFB] py-7">
        <Container>
          <TrustStrip />
        </Container>
      </section>
      <section id="varaa" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Valitse vuokrakohteesi"
            subtitle="Kaksi huippuluokan vaihtoehtoa — perhematkailuun tai rentoutumiseen luonnon keskellä."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {rentalProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/hinnasto"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-12 rounded-xl border-gray-200 px-6",
              })}
            >
              Katso koko hinnasto
            </Link>
          </div>
        </Container>
      </section>
      <WhyUs />
      <ReviewsSection reviews={reviews} />
      <section className="bg-[#F9FAFB] py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading title="Usein kysyttyä" />
          <FAQAccordion items={faqItems} />
        </Container>
      </section>
    </>
  );
}
