import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center gap-2 sm:gap-3", className)}
      aria-label={`${site.name} ja ${site.partnerName}`}
    >
      <SafeImage
        src={site.logos.caravan}
        alt={site.name}
        width={48}
        height={48}
        className="size-10 shrink-0 rounded-lg object-cover shadow-sm sm:size-11"
        priority
      />
      <SafeImage
        src={site.logos.palju}
        alt={site.partnerName}
        width={220}
        height={48}
        className={cn(
          "h-8 w-auto object-contain sm:h-9",
          compact && "max-w-[8rem] sm:max-w-none"
        )}
        priority
      />
    </Link>
  );
}
