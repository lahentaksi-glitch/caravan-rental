import { CircleUser, Star } from "lucide-react";
import type { Review } from "@/types/rental";
import { cn } from "@/lib/utils";

export function ReviewQuote({
  review,
  className,
}: {
  review: Pick<Review, "name" | "location" | "product" | "rating" | "text">;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_-24px_rgba(20,40,80,0.45)] backdrop-blur-md",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div
          className="flex gap-0.5 text-accent"
          aria-label={`${review.rating} tähteä`}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-5 fill-current drop-shadow-sm" aria-hidden />
          ))}
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          Asiakaspalaute
        </span>
      </div>
      <blockquote className="text-base leading-relaxed text-foreground/90">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary ring-1 ring-primary/10">
          <CircleUser className="size-7" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">{review.name}</span>
          <span className="block text-xs text-muted-foreground">
            {review.location} · {review.product}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
