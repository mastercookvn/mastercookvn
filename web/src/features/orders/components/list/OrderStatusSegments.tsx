"use client";

import { ORDER_STATUS_META } from "@/constants/labels";
import type { OrderStatus } from "@/constants/statuses";

export type OrderFilter = OrderStatus | "ALL";

export function OrderStatusSegments({
  options,
  active,
  counts,
  onChange,
}: {
  options: OrderFilter[];
  active: OrderFilter;
  counts: Record<string, number>;
  onChange: (filter: OrderFilter) => void;
}) {
  return (
    <div className="segments">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === active ? "is-on" : undefined}
          onClick={() => onChange(option)}
        >
          {option === "ALL" ? "Tất cả" : ORDER_STATUS_META[option].label}{" "}
          {counts[option]}
        </button>
      ))}
    </div>
  );
}
