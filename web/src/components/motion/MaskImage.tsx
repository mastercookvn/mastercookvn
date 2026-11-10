import Image from "next/image";

import { Reveal } from "./Reveal";

type MaskImageProps = {
  src: string;
  alt: string;
  sizes: string;
  delayMs?: number;
  className?: string;
};

/** M06 */
export function MaskImage({
  src,
  alt,
  sizes,
  delayMs = 0,
  className = "media",
}: MaskImageProps) {
  return (
    <Reveal as="span" variant="mask" delayMs={delayMs} className={className}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </Reveal>
  );
}
