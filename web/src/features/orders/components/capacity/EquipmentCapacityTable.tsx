"use client";

import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatNumber } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import type { OrderMeal } from "@/mocks/orders";

import { equipmentCapacityRows } from "@/features/orders/lib/capacity";

export function EquipmentCapacityTable({ meal }: { meal: OrderMeal }) {
  const shortage = useDemoState((state) => state.simulateShortage);

  return (
    <DataTable
      columns={[
        "Dụng cụ",
        "Cơ sở",
        num("Cần"),
        num("Dùng được"),
        num("Đã giữ"),
        num("Khả dụng"),
        "Kết quả",
      ]}
      rows={equipmentCapacityRows(meal, shortage).map((row) => [
        row.name,
        <span key="basis" className="text-soft">
          {row.basis}
        </span>,
        formatNumber(row.needed),
        formatNumber(row.usable),
        formatNumber(row.held),
        formatNumber(row.available),
        row.short ? (
          <Badge key="result" tone="error">
            Thiếu {row.needed - row.available}
          </Badge>
        ) : row.belowMinimum ? (
          <Badge key="result" tone="wait">
            Đủ, dưới tối thiểu
          </Badge>
        ) : (
          <Badge key="result" tone="good">
            Đủ
          </Badge>
        ),
      ])}
    />
  );
}
