import Image from "next/image";
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
    <Card className="overflow-hidden border-border/80 shadow-md transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Badge className="absolute left-4 top-4 bg-primary/90 text-primary-foreground">
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
      <CardFooter>
        <Link
          href={`/tuotteet/${product.slug}`}
          className={cn(buttonVariants({ size: "lg" }), "w-full bg-primary hover:bg-primary/90")}
        >
          Katso tiedot & varaa
        </Link>
      </CardFooter>
    </Card>
  );
}
