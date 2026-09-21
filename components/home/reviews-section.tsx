"use client";

import type { Review } from "@/types/rental";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewQuote } from "@/components/ui/review-quote";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="bg-[#F9FAFB] py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Asiakkaiden kokemuksia"
          subtitle="Oikeita palautteita vuokraajiltamme Päijät-Hämeestä."
        />
        {reviews.length === 0 ? (
          <p className="text-center text-zinc-500">Arvosteluja tulossa pian.</p>
        ) : (
          <Carousel
            opts={{ align: "start", loop: false }}
            className="relative px-0 sm:px-12"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="pl-4 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <ReviewQuote review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="hidden size-10 border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-white sm:flex"
              aria-label="Edellinen arvostelu"
            />
            <CarouselNext
              className="hidden size-10 border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-white sm:flex"
              aria-label="Seuraava arvostelu"
            />
          </Carousel>
        )}
      </Container>
    </section>
  );
}
