"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/lib/demoStore";

import { ServiceCard } from "./ServiceCard";

export function ServiceCardGrid() {
  const services = useDemoState((state) => state.services);
  const activeServices = services.filter((service) => service.active !== false);

  if (!activeServices.length) {
    return <EmptyState>Chưa có dịch vụ nào.</EmptyState>;
  }

  return (
    <section className="l-grid l-grid-4">
      {activeServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}
