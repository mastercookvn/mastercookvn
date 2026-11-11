import type { ReactNode } from "react";

import { MediaImage } from "@/components/ui/MediaImage";
import type { MediaKey } from "@/lib/media";

import { Reveal } from "./Reveal";

type MaskImageProps = {
  imageKey: MediaKey | undefined;
  alt: string;
  sizes: string;
  delayMs?: number;
  className?: string;
  fallback?: ReactNode;
};

/** M06 */
export function MaskImage({
  imageKey,
  alt,
  sizes,
  delayMs = 0,
  className = "media",
  fallback,
}: MaskImageProps) {
  return (
    <Reveal as="span" variant="mask" delayMs={delayMs} className={className}>
      <MediaImage
        imageKey={imageKey}
        alt={alt}
        sizes={sizes}
        fallback={fallback}
      />
    </Reveal>
  );
}
