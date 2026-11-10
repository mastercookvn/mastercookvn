import { Reveal } from "@/components/motion/Reveal";

import { JourneyScroller } from "./JourneyScroller";

export function ServiceJourney() {
  return (
    <section className="band journey on-navy">
      <div className="block-inner">
        <div className="block-head">
          <div>
            <Reveal as="span" variant="fade" className="eyebrow">
              Cách chúng tôi phục vụ
            </Reveal>
            <Reveal as="h2" variant="up" className="h2-section text-surface">
              Món nấu trước ở bếp, tiệc được lo trọn tại nơi bạn chọn
            </Reveal>
          </div>
        </div>
        <JourneyScroller />
      </div>
    </section>
  );
}
