import { MediaImage } from "@/components/ui/MediaImage";
import { MEDIA_FOLDER, mediaKey } from "@/lib/media";

import { Reveal } from "@/components/motion/Reveal";
import { ScrollParallax } from "@/components/motion/ScrollParallax";

/** M01, M05 */
export function HeroCinema() {
  return (
    <ScrollParallax factor={0.14} className="hero-media">
      <Reveal variant="wipe" immediate className="hero-media-clip">
        <span className="hero-media-frame">
          <MediaImage
            imageKey={mediaKey(MEDIA_FOLDER.Scenes, "home1.jpg")}
            alt="Minh họa bàn tiệc nhìn từ trên xuống, đĩa sứ men lam trên khăn xanh đậm"
            priority
            sizes="(max-width: 760px) 100vw, 62vw"
          />
        </span>
      </Reveal>
    </ScrollParallax>
  );
}
