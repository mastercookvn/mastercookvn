import { ArrowIcon } from "@/components/icons";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";

import { HeroCinema } from "./HeroCinema";

const TITLE_LINES = ["Nấu sẵn tại bếp,", "trọn vẹn đến", "từng bàn tiệc."];

export function HeroSection() {
  return (
    <section className="hero">
      <HeroCinema />
      <div className="hero-inner">
        <ScrollParallax factor={-0.07} className="hero-copy">
          <Reveal
            as="span"
            variant="fade"
            immediate
            delayMs={200}
            className="eyebrow text-xl"
          >
            Tiệc nấu sẵn, giao tận nơi
          </Reveal>
          <h1>
            <LineReveal lines={TITLE_LINES} startMs={300} immediate />
          </h1>
          <Reveal
            as="p"
            variant="up"
            immediate
            delayMs={800}
            className="hero-lead"
          >
            <span className="text-2xl font-bold">MasterCookVN</span> chuẩn bị
            món tại bếp của cơ sở, rồi mang đến địa điểm của bạn cùng người phục
            vụ, bàn ghế và dụng cụ. Bạn chỉ việc chọn món và mời khách.
          </Reveal>
          <Reveal variant="up" immediate delayMs={920} className="l-row gap-5">
            <ButtonLink href={ROUTES.booking} variant="inverse" size="lg">
              Tính giá tiệc <ArrowIcon size={16} className="btn-arrow" />
            </ButtonLink>
            <ButtonLink href={ROUTES.menu} variant="text">
              Xem thực đơn
            </ButtonLink>
          </Reveal>
          <Reveal
            as="span"
            variant="fade"
            immediate
            delayMs={1100}
            className="hero-note"
          >
            Tính giá không cần đăng nhập và chưa phải cam kết.
          </Reveal>
        </ScrollParallax>
      </div>
    </section>
  );
}
