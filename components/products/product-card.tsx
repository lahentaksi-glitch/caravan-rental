import { Gauge } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import type { RentalProduct, RentalSpec } from "@/types/rental";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEuro } from "@/lib/pricing";
import { bookNowClassName, bookNowOutlineClassName } from "@/lib/cta";
import { specIconMap } from "@/lib/spec-icons";

export function ProductCard({ product }: { product: RentalProduct }) {
  const categoryLabel =
    product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu";
  const preferredIcons =
    product.category === "caravan"
      ? ["bed", "weight", "thermometer", "ruler"]
      : ["users", "flame", "weight", "car"];
  const featuredSpecs = preferredIcons
    .map((icon) => product.specs.find((spec) => spec.icon === icon))
    .filter((spec): spec is RentalSpec => Boolean(spec));

  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-0 bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.75rem]">
        <SafeImage
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Badge className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-primary-foreground shadow-sm">
          {categoryLabel}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold tracking-tight">{product.name}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{product.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {featuredSpecs.map((spec) => {
            const Icon = specIconMap[spec.icon] ?? Gauge;
            return (
              <li
                key={spec.label}
                className="flex items-center gap-2.5 rounded-2xl bg-slate-50/80 px-3 py-2.5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-[0_4px_10px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/70">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {spec.value}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-lg font-semibold text-foreground">
          {product.priceFrom.label}{" "}
          <span className="text-accent">{formatEuro(product.priceFrom.amount)}</span>
          <span className="text-sm font-normal text-muted-foreground">
            /{product.priceFrom.unit}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 rounded-b-[1.75rem] border-t border-slate-100 bg-transparent sm:flex-row">
        <Link
          href={`/tuotteet/${product.slug}#varaa`}
          className={bookNowClassName("w-full")}
        >
          Varaa nyt
        </Link>
        <Link
          href={`/tuotteet/${product.slug}`}
          className={bookNowOutlineClassName("w-full")}
        >
          Katso tiedot
        </Link>
      </CardFooter>
    </Card>
  );
}
