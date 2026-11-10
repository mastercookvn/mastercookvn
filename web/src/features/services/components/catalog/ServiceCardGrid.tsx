import { SERVICES } from "@/mocks/catalog";

import { ServiceCard } from "./ServiceCard";

export function ServiceCardGrid() {
  return (
    <section className="l-grid l-grid-4">
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}
