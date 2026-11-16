"use client";

import { FlowerIcon } from "@/components/icons";
import { SearchPicker } from "@/components/ui/SearchPicker";
import { useDemoState } from "@/mocks/demoStore";

export function ServicePicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (serviceIds: string[]) => void;
}) {
  const services = useDemoState((state) => state.services).filter(
    (service) => service.active !== false
  );

  return (
    <SearchPicker
      options={services.map((service) => ({
        id: service.id,
        name: service.name,
        meta: service.description,
        price: service.price,
        priceUnit: service.unit,
        imageKey: service.imageKey,
      }))}
      selectedIds={selected}
      onChange={onChange}
      label="Tìm dịch vụ đi kèm"
      placeholder="Tìm dịch vụ, ví dụ: hoa, karaoke"
      emptyText="Chưa chọn dịch vụ nào. Bữa vẫn đặt được khi không cần dịch vụ."
      fallbackIcon={<FlowerIcon size={18} />}
    />
  );
}
