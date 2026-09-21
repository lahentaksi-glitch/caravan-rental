"use client";

import Image from "next/image";
import { useState } from "react";
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
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        Kuvia ei saatavilla
      </div>
    );
  }

  const activeSrc = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_-24px_rgba(20,40,80,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
        onClick={() => setLightboxOpen(true)}
        aria-label="Avaa kuva suurena"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={activeSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow">
          <Expand className="size-3.5" aria-hidden />
          Suurenna
        </span>
      </button>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-200 hover:scale-[1.03]",
              index === active ? "border-accent ring-2 ring-accent/30" : "border-transparent opacity-80 hover:opacity-100"
            )}
            aria-label={`Näytä kuva ${index + 1}`}
            aria-current={index === active}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-2 shadow-none sm:p-4">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image src={activeSrc} alt={alt} fill className="object-contain" sizes="90vw" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
