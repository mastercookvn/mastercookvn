"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney, formatNumber } from "@/lib/format";
import { COUNT_REPORT_STATUS } from "@/constants/equipment";
import { useDemoState } from "@/lib/demoStore";

export function EquipmentReportTable() {
  const equipment = useDemoState((state) => state.equipment);
  const purchases = useDemoState((state) => state.equipmentPurchases);
  const countReports = useDemoState((state) => state.countReports);
  const countRows = Object.values(countReports)
    .filter((report) => report.status === COUNT_REPORT_STATUS.Confirmed)
    .flatMap((report) => report.rows);
  // Restored and discarded quantities are not recorded locally; the report API will supply them.
  const rows = equipment.map((item) => {
    const counted = countRows.filter((row) => row.name === item.name);
    return {
      item,
      purchased: purchases
        .flatMap((purchase) => purchase.lines)
        .filter((line) => line.equipment === item.name)
        .reduce((sum, line) => sum + line.quantity, 0),
      damaged: counted.reduce((sum, row) => sum + row.damaged, 0),
      lost: counted.reduce((sum, row) => sum + row.lost, 0),
      compensation: counted.reduce(
        (sum, row) => sum + row.charged * row.price,
        0
      ),
    };
  });

  return (
    <>
      <PanelHeader
        title="Báo cáo dụng cụ"
        actions={
          <>
            <CheckboxLabel>Chỉ loại dưới ngưỡng</CheckboxLabel>
            <ExportButton
              fileName="bao-cao-dung-cu"
              columns={[
                "Dụng cụ",
                "Sở hữu",
                "Sẵn sàng",
                "Đang dùng",
                "Hư",
                "Tối thiểu",
                "Nhập mua",
                "Hư trong kỳ",
                "Mất",
                "Bồi thường (đ)",
              ]}
              rows={rows.map(({ item, ...period }) => [
                item.name,
                item.owned,
                item.ready,
                item.inUse,
                item.damaged,
                item.minimum,
                period.purchased,
                period.damaged,
                period.lost,
                period.compensation,
              ])}
            />
          </>
        }
      />
      <DataTable
        columns={[
          "Dụng cụ",
          num("Sở hữu"),
          num("Sẵn sàng"),
          num("Đang dùng"),
          num("Hư"),
          num("Tối thiểu"),
          num("Nhập mua"),
          num("Hư trong kỳ"),
          num("Mất"),
          num("Bồi thường"),
        ]}
        rows={rows.map(({ item, ...period }) => [
          item.name,
          formatNumber(item.owned),
          formatNumber(item.ready),
          formatNumber(item.inUse),
          item.damaged,
          formatNumber(item.minimum),
          period.purchased,
          period.damaged,
          period.lost,
          formatMoney(period.compensation),
        ])}
      />
    </>
  );
}
