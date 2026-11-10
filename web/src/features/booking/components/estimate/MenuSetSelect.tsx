"use client";

import { SelectField } from "@/components/ui/SelectField";
import { formatMoney } from "@/lib/format";
import { MENU_SETS, menuSetPrice } from "@/mocks/catalog";

const OPTIONS = MENU_SETS.map((set) => ({
  value: set.id,
  label: `${set.name} · ${formatMoney(menuSetPrice(set))}/bàn chuẩn`,
}));

export function MenuSetSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <SelectField
      id={id}
      label="Set thực đơn"
      options={OPTIONS}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
