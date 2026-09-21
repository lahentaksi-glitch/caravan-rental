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
    <Card className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
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
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl font-extrabold tracking-tight">{product.name}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{product.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="grid grid-cols-2 gap-3">
          {featuredSpecs.map((spec) => {
            const Icon = specIconMap[spec.icon] ?? Gauge;
            return (
              <li
                key={spec.label}
                className="flex min-h-[4.25rem] items-center gap-3 rounded-xl border border-gray-100 bg-[#F9FAFB] px-3 py-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-sm ring-1 ring-gray-100">
                  <Icon className="size-4" aria-hidden />
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
      <CardFooter className="mt-auto flex flex-col gap-2 border-t border-gray-100 bg-white px-6 py-5">
        <Link
          href={`/tuotteet/${product.slug}#varaa`}
          className={bookNowClassName("w-full")}
        >
          Varaa nyt
        </Link>
        <Link
          href={`/tuotteet/${product.slug}`}
          className={bookNowOutlineClassName("w-full border-gray-200")}
        >
          Katso tiedot
        </Link>
      </CardFooter>
    </Card>
  );
}
