import Link from "next/link";
import { rentalProducts } from "@/data/rentals";
import { faqItems } from "@/data/faq";
import { reviews } from "@/data/reviews";
import { Hero } from "@/components/home/hero";
import { WhyUs } from "@/components/home/why-us";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ProductCard } from "@/components/products/product-card";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="varaa" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Valitse vuokrakohteesi"
            subtitle="Kaksi huippuluokan vaihtoehtoa — perhematkailuun tai rentoutumiseen luonnon keskellä."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {rentalProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/hinnasto" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Katso koko hinnasto
            </Link>
          </div>
        </Container>
      </section>
      <WhyUs />
      <ReviewsSection reviews={reviews} />
      <section className="bg-muted/30 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Usein kysyttyä" />
          <FAQAccordion items={faqItems} />
        </Container>
      </section>
    </>
  );
}
