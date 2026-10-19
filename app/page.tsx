import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import { reviews } from "@/data/reviews";
import { siteKeywords } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { CatalogSection } from "@/components/home/catalog-section";
import { BookingTeaser } from "@/components/home/booking-teaser";
import { CleanlinessGuarantee } from "@/components/home/cleanliness-guarantee";
import { WhyUs } from "@/components/home/why-us";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = pageMetadata({
  path: "/",
  keywords: siteKeywords,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CatalogSection />
      <CleanlinessGuarantee />
      <BookingTeaser />
      <WhyUs />
      <ReviewsSection reviews={reviews} />
      <section id="ukk" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Usein kysyttyä" />
          <FAQAccordion items={faqItems} />
        </Container>
      </section>
    </>
  );
}
