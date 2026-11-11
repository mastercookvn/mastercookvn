"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { mediaUrl, type MediaKey } from "@/lib/media";
import { useDemoState } from "@/mocks/demoStore";

/** Resolves a stored media key; a photo just uploaded in this browser wins over the bucket copy. */
export function useMediaSrc(imageKey: MediaKey | undefined) {
  const draft = useDemoState((state) =>
    imageKey ? state.mediaUploads[imageKey] : undefined
  );
  return imageKey ? (draft ?? mediaUrl(imageKey)) : null;
}

export function MediaImage({
  imageKey,
  alt,
  sizes,
  fallback = null,
  priority = false,
}: {
  imageKey: MediaKey | undefined;
  alt: string;
  sizes: string;
  fallback?: ReactNode;
  priority?: boolean;
}) {
  const src = useMediaSrc(imageKey);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return fallback;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      // Signed bucket URLs expire, so they skip the Next image cache.
      unoptimized
      className="object-cover"
      onError={() => {
        console.warn(`Media ${imageKey} could not be loaded`);
        setFailedSrc(src);
      }}
    />
  );
}
