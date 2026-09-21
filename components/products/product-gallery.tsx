"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { useEffect, useRef, useState } from "react";
import { Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  alt,
  caption,
}: {
  images: string[];
  alt: string;
  caption?: string;
}) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const firstPaint = useRef(true);

  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    setVisible(false);
    const timer = window.setTimeout(() => setVisible(true), 40);
    return () => window.clearTimeout(timer);
  }, [active]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-100 bg-[#F9FAFB] text-muted-foreground">
        Kuvia ei saatavilla
      </div>
    );
  }

  const activeSrc = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_-18px_rgba(15,23,42,0.35)]"
        onClick={() => setLightboxOpen(true)}
        aria-label="Avaa kuva suurena"
      >
        <div className="relative aspect-[4/3] w-full bg-[#F9FAFB] lg:min-h-[26rem]">
          <SafeImage
            src={activeSrc}
            alt={alt}
            fill
            priority
            quality={90}
            className={cn(
              "object-cover transition-opacity duration-500 ease-out",
              visible ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Saatavilla heti
        </span>
        {caption ? (
          <span className="absolute bottom-4 left-4 rounded-lg bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-white">
            {caption}
          </span>
        ) : null}
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Expand className="size-3.5" aria-hidden />
          Suurenna
        </span>
      </button>

      <div
        className={cn(
          "grid gap-2.5",
          images.length <= 4 ? "grid-cols-4" : "grid-cols-4 sm:grid-cols-6"
        )}
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-xl border-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              index === active
                ? "border-accent ring-2 ring-accent/25"
                : "border-transparent opacity-80 hover:opacity-100"
            )}
            aria-label={`Näytä kuva ${index + 1}`}
            aria-current={index === active}
          >
            <SafeImage src={src} alt="" fill className="object-cover" sizes="96px" />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-2 shadow-none sm:p-4">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40">
            <SafeImage src={activeSrc} alt={alt} fill className="object-contain" sizes="90vw" quality={90} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
