import type { Review } from "@/types/rental";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewQuote } from "@/components/ui/review-quote";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Asiakkaiden kokemuksia"
          subtitle="Oikeita palautteita vuokraajiltamme Päijät-Hämeestä."
        />
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">Arvosteluja tulossa pian.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <ReviewQuote key={review.id} review={review} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
