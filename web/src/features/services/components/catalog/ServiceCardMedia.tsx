"use client";

import type { ComponentType } from "react";

import {
  BroomIcon,
  FlowerIcon,
  MicIcon,
  type IconProps,
} from "@/components/icons";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Service } from "@/mocks/catalog";

const SERVICE_ICONS: Record<string, ComponentType<IconProps>> = {
  don: BroomIcon,
  cong: FlowerIcon,
  karaoke: MicIcon,
  banhoa: FlowerIcon,
};

export function ServiceCardMedia({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.id] ?? FlowerIcon;

  return (
    <div className="service-card-media">
      <MediaImage
        imageKey={service.imageKey}
        alt={service.name}
        sizes="(max-width: 760px) 50vw, (max-width: 1080px) 50vw, 25vw"
        fallback={<Icon size={44} />}
      />
    </div>
  );
}
