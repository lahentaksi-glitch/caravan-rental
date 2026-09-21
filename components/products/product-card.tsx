import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import type { RentalProduct } from "@/types/rental";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatEuro } from "@/lib/pricing";

export function ProductCard({ product }: { product: RentalProduct }) {
  const categoryLabel =
    product.category === "caravan" ? "Asuntovaunu" : "Paljuvaunu";

  return (
    <Card className="group overflow-hidden rounded-3xl border-white/60 bg-white/75 shadow-[0_20px_50px_-28px_rgba(20,40,80,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(20,40,80,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Badge className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-primary-foreground shadow-md">
          {categoryLabel}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="text-base">{product.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {product.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent" aria-hidden>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold text-foreground">
          {product.priceFrom.label}{" "}
          <span className="text-accent">{formatEuro(product.priceFrom.amount)}</span>
          <span className="text-sm font-normal text-muted-foreground">
            /{product.priceFrom.unit}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/tuotteet/${product.slug}#varaa`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
          )}
        >
          Varaa nyt
        </Link>
        <Link
          href={`/tuotteet/${product.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 w-full rounded-xl"
          )}
        >
          Katso tiedot
        </Link>
      </CardFooter>
    </Card>
  );
}
