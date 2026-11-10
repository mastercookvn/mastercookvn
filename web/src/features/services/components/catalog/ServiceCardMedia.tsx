"use client";

import Image from "next/image";
import type { ComponentType } from "react";

import {
  BroomIcon,
  FlowerIcon,
  MicIcon,
  type IconProps,
} from "@/components/icons";
import type { Service } from "@/mocks/catalog";
import { useDemoState } from "@/mocks/demoStore";

const SERVICE_ICONS: Record<string, ComponentType<IconProps>> = {
  don: BroomIcon,
  cong: FlowerIcon,
  karaoke: MicIcon,
  banhoa: FlowerIcon,
};

// Shows the service icon until a photo is uploaded or Service.image is set.
export function ServiceCardMedia({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.id] ?? FlowerIcon;
  const uploaded = useDemoState((state) => state.serviceImages[service.id]);
  const image = uploaded ?? service.image;

  return (
    <div className="service-card-media">
      {image ? (
        <Image
          src={image}
          alt={service.name}
          fill
          sizes="(max-width: 760px) 50vw, (max-width: 1080px) 50vw, 25vw"
          className="object-cover"
        />
      ) : (
        <Icon size={44} />
      )}
    </div>
  );
}
