import type { ComponentType } from "react";

import {
  CakeIcon,
  FireIcon,
  FlowerIcon,
  HomeIcon,
  RingsIcon,
  TeamIcon,
  type IconProps,
} from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { EVENT_TYPES } from "@/mocks/catalog";

import { SectionHeading } from "@/features/home/components/SectionHeading";

const EVENT_ICONS: Record<string, ComponentType<IconProps>> = {
  "Cưới hỏi": RingsIcon,
  "Sinh nhật": CakeIcon,
  Giỗ: FlowerIcon,
  "Tất niên": FireIcon,
  "Tân gia": HomeIcon,
  "Họp mặt": TeamIcon,
};

export function EventTypeList() {
  return (
    <section className="band">
      <div className="block-inner">
        <SectionHeading eyebrow="Loại tiệc" title="Dịp nào cũng lo được" />
        <div className="event-types">
          {EVENT_TYPES.map((name, index) => {
            const Icon = EVENT_ICONS[name];
            return (
              <Reveal
                key={name}
                variant="up"
                delayMs={index * 70}
                className="event-type"
              >
                <Icon size={30} />
                {name}
              </Reveal>
            );
          })}
        </div>
        <p className="text-soft">
          Tiệc diễn ra tại địa điểm do bạn chuẩn bị. Cơ sở không cung cấp mặt
          bằng.
        </p>
      </div>
    </section>
  );
}
