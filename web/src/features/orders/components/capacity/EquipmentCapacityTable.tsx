"use client";

import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import { capacityRows } from "@/mocks/equipment";

export function EquipmentCapacityTable() {
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
      rows={capacityRows(shortage).map((row) => [
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
