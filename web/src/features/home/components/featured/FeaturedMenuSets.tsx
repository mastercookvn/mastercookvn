import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { ROUTES } from "@/constants/routes";
import { MenuSetGrid } from "@/features/menu/components/sets/MenuSetGrid";
import Link from "next/link";

import { SectionHeading } from "@/features/home/components/SectionHeading";

export function FeaturedMenuSets() {
  return (
    <section className="band">
      <div className="block-inner">
        <SectionHeading
          eyebrow="Thực đơn chọn sẵn"
          title="Ba set cho những dịp quen thuộc"
          action={
            <Reveal variant="fade">
              <Link href={ROUTES.menu} className={buttonVariants()}>
                Xem tất cả món <ArrowIcon size={16} className="btn-arrow" />
              </Link>
            </Reveal>
          }
        />
        <MenuSetGrid />
      </div>
    </section>
  );
}
