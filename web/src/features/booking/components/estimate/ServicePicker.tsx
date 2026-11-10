"use client";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { SERVICES } from "@/mocks/catalog";

export function ServicePicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (serviceIds: string[]) => void;
}) {
  return (
    <div className="l-stack gap-1.5">
      <span className="text-small text-soft font-semibold">Dịch vụ đi kèm</span>
      <div className="l-row gap-x-4 gap-y-1.5">
        {SERVICES.map((service) => (
          <CheckboxLabel
            key={service.id}
            checked={selected.includes(service.id)}
            onChange={(event) =>
              onChange(
                event.target.checked
                  ? [...selected, service.id]
                  : selected.filter((id) => id !== service.id),
              )
            }
          >
            {service.name}
          </CheckboxLabel>
        ))}
      </div>
    </div>
  );
}
