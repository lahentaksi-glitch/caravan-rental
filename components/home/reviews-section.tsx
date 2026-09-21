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
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Asiakkaiden kokemuksia"
          subtitle="Oikeita palautteita vuokraajiltamme Päijät-Hämeestä."
        />
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">Arvosteluja tulossa pian.</p>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="mx-auto w-full max-w-5xl"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <ReviewQuote review={review} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-12" />
            <CarouselNext className="-right-2 sm:-right-12" />
            <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">
              Pyyhkäise nähdäksesi lisää palautteita
            </p>
          </Carousel>
        )}
      </Container>
    </section>
  );
}
