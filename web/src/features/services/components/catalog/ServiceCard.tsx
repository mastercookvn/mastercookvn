import { Reveal } from "@/components/motion/Reveal";
import { CardTitle } from "@/components/ui/CardTitle";
import { formatMoney } from "@/lib/format";
import type { Service } from "@/mocks/catalog";

import { ServiceCardMedia } from "./ServiceCardMedia";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Reveal as="article" variant="up" className="service-card">
      <ServiceCardMedia service={service} />
      <div className="service-card-body">
        <CardTitle>{service.name}</CardTitle>
        <p className="text-soft text-small flex-1">{service.description}</p>
        <span className="price">
          {formatMoney(service.price)} <small>/ {service.unit}</small>
        </span>
      </div>
    </Reveal>
  );
}
