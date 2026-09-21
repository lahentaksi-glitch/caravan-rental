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
      className={cn("flex min-w-0 items-center gap-3", className)}
      aria-label={site.name}
    >
      <SafeImage
        src={site.logos.icon}
        alt=""
        width={40}
        height={40}
        className="size-9 shrink-0 rounded-lg object-cover sm:size-10"
        priority
      />
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-semibold tracking-tight text-zinc-900">
          {site.name}
        </span>
        {compact ? null : (
          <span className="hidden truncate text-xs text-zinc-500 sm:block">{site.tagline}</span>
        )}
      </span>
      {compact ? (
        <span className="hidden h-4 w-px bg-zinc-200 sm:block" aria-hidden />
      ) : null}
      {compact ? (
        <span className="hidden text-sm text-zinc-500 lg:block">{site.tagline}</span>
      ) : null}
    </Link>
  );
}
