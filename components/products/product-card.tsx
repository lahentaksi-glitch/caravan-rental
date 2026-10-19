import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import type { RentalProduct } from "@/types/rental";
import { site } from "@/data/site";
import { formatEuro } from "@/lib/pricing";
import { bookNowClassName } from "@/lib/cta";

export function ProductCard({ product }: { product: RentalProduct }) {
  const categoryLabel = product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu";
  const bullets = product.highlights.slice(0, 3);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <Link href={`/tuotteet/${product.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <SafeImage
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-semibold text-white">
          {categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <Link href={`/tuotteet/${product.slug}`}>
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">{product.name}</h3>
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{product.shortDescription}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-zinc-600">
          {bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">{site.pickupNote}</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">{site.deliveryNote}</p>
        <div className="mt-auto pt-5">
          <p className="text-base font-medium text-zinc-900">
            alkaen <span className="font-semibold text-accent">{formatEuro(product.nightlyRate)}</span>
            <span className="font-normal text-zinc-400"> / vrk</span>
          </p>
          {product.category === "hot-tub" ? (
            <p className="mt-1 text-sm text-zinc-500">
              Viikonloppu (pe–su){" "}
              <span className="font-semibold text-accent">{formatEuro(product.weekendRate)}</span>
              {" · "}ma–to{" "}
              <span className="font-semibold text-accent">120 €</span>
            </p>
          ) : null}
          <Link
            href={`/tuotteet/${product.slug}#varaa`}
            className={bookNowClassName("mt-5 w-full justify-center rounded-full")}
          >
            Varaa nyt
          </Link>
        </div>
      </div>
    </article>
  );
}
