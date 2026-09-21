import { Star } from "lucide-react";
import type { Review } from "@/types/rental";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name
    .split(/[\s&/,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
        "flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-md sm:p-8",
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-500"
          aria-label={`${review.rating} tähteä`}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden />
          ))}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Asiakaspalaute
        </span>
      </div>
      <blockquote className="flex-1 text-base leading-relaxed text-slate-700">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-sm"
          aria-hidden
        >
          {initials(review.name)}
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
