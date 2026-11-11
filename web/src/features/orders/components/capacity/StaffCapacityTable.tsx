"use client";

import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { useDemoState } from "@/mocks/demoStore";
import type { OrderMeal } from "@/mocks/orders";

import { staffCapacityRows } from "@/features/orders/lib/capacity";

export function StaffCapacityTable({ meal }: { meal: OrderMeal }) {
  const staff = useDemoState((state) => state.staff);
  const assignments = useDemoState((state) => state.assignments);

  return (
    <DataTable
      columns={[
        "Vị trí",
        num("Nhu cầu bữa"),
        num("Chồng giờ"),
        num("Đang làm"),
        "Kết quả",
      ]}
      rows={staffCapacityRows(meal, staff, assignments).map((row) => [
        row.position,
        row.needed,
        row.overlapping,
        row.active,
        row.short ? (
          <Badge key="result" tone="error">
            Thiếu {row.needed - (row.active - row.overlapping)}
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
