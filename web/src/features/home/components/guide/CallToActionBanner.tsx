import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { ROUTES } from "@/constants/routes";

export function CallToActionBanner() {
  return (
    <section className="cta on-navy">
      <ScrollParallax factor={0.1} className="media cta-media">
        <Image
          src="/images/scenes/cta.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ScrollParallax>
      <div className="cta-inner">
        <Reveal as="span" variant="fade" className="eyebrow">
          Bắt đầu
        </Reveal>
        <Reveal as="h2" variant="up">
          Đã có ngày tổ chức? Tính giá trong vài phút.
        </Reveal>
        <Reveal as="p" variant="up" delayMs={120}>
          Thêm một hoặc nhiều bữa, rồi gửi đơn với chính lựa chọn đó.
        </Reveal>
        <Reveal variant="up" delayMs={240}>
          <Link
            href={ROUTES.booking}
            className={buttonVariants({ variant: "inverse", size: "lg" })}
          >
            Bắt đầu <ArrowIcon size={16} className="btn-arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
