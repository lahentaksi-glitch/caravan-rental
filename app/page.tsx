import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { CatalogSection } from "@/components/home/catalog-section";
import { BookingTeaser } from "@/components/home/booking-teaser";

export const metadata: Metadata = pageMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CatalogSection />
      <BookingTeaser />
    </>
  );
}
