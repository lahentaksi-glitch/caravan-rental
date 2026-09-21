import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import type { RentalProduct } from "@/types/rental";
import { formatEuro } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index,
  featured = false,
}: {
  product: RentalProduct;
  index: number;
  featured?: boolean;
}) {
  const categoryLabel = product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu";
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/tuotteet/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-4 transition-transform duration-300 hover:-translate-y-0.5 sm:p-5",
        featured
          ? "border-zinc-800 bg-zinc-900 text-white shadow-lg"
          : "border-zinc-200/80 bg-white text-zinc-900"
      )}
    >
      {featured ? (
        <span className="absolute inset-y-5 left-0 w-1 rounded-full bg-accent" aria-hidden />
      ) : null}
      <div className="mb-3 flex items-center justify-between text-xs font-medium">
        <span className={featured ? "text-zinc-400" : "text-zinc-400"}>{number}</span>
        <span className={featured ? "text-zinc-300" : "text-zinc-500"}>{categoryLabel}</span>
      </div>
      {featured ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Suosittu
        </p>
      ) : null}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <SafeImage
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight">{product.name}</h3>
          <p className={cn("mt-0.5 text-sm", featured ? "text-zinc-400" : "text-zinc-400")}>
            / vrk · alkaen
          </p>
        </div>
        <p className={cn("text-xl font-semibold", featured ? "text-accent" : "text-zinc-900")}>
          {formatEuro(product.nightlyRate)}
        </p>
      </div>
      <span className="sr-only">Avaa {product.name}</span>
    </Link>
  );
}
