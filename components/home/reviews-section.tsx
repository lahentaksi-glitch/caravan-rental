import { Star } from "lucide-react";
import type { Review } from "@/types/rental";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
                  <Card className="h-full border-border/80 shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-3 flex gap-0.5 text-accent" aria-label={`${review.rating} tähteä`}>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-current" aria-hidden />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-foreground">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <p className="mt-4 text-sm font-medium text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.location} · {review.product}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        )}
      </Container>
    </section>
  );
}
