"use client";

import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatNumber } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";

export function StockTable() {
  const equipment = useDemoState((state) => state.equipment);

  return (
    <>
      <PanelHeader title="Tồn kho dụng cụ" count={equipment.length} />
      <DataTable
        columns={[
          "Dụng cụ",
          num("Sở hữu"),
          num("Sẵn sàng"),
          num("Đang sử dụng"),
          num("Hư"),
          num("Tối thiểu"),
          "Cờ",
        ]}
        rows={equipment.map((item) => [
          item.name,
          formatNumber(item.owned),
          formatNumber(item.ready),
          formatNumber(item.inUse),
          item.damaged,
          formatNumber(item.minimum),
          item.ready < item.minimum ? (
            <Badge key="flag" tone="wait">
              Dưới tối thiểu
            </Badge>
          ) : (
            <Badge key="flag" tone="good">
              Ổn
            </Badge>
          ),
        ])}
      />
    </>
  );
}
