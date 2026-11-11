"use client";

import { SelectField } from "@/components/ui/SelectField";
import { formatMoney } from "@/lib/format";
import { menuSetPriceFrom } from "@/mocks/catalog";
import { useDemoState } from "@/mocks/demoStore";

export function MenuSetSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const menuSets = useDemoState((state) => state.menuSets);
  const dishes = useDemoState((state) => state.dishes);
  const options = menuSets
    .filter((set) => set.active !== false || set.id === value)
    .map((set) => ({
      value: set.id,
      label: `${set.name} · ${formatMoney(menuSetPriceFrom(set, dishes))}/bàn chuẩn${
        set.active === false ? " (đã ngưng)" : ""
      }`,
    }));

  return (
    <SelectField
      id={id}
      label="Set thực đơn"
      options={options}
      value={value}
      onValueChange={(next) => onChange(next)}
    />
  );
}
