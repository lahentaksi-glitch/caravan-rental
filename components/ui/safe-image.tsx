"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SafeImageProps = ImageProps & {
  fallbackClassName?: string;
  fallbackLabel?: string;
};

export function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackLabel = "Kuva ei saatavilla",
  onError,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const fill = "fill" in props && props.fill === true;

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel}
        className={cn(
          "flex items-center justify-center bg-muted text-center text-xs text-muted-foreground",
          fill ? "absolute inset-0 h-full w-full" : "h-full w-full min-h-10 min-w-10",
          className,
          fallbackClassName
        )}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
