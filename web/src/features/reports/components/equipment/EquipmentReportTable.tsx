import { DataTable, num } from "@/components/ui/DataTable";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney, formatNumber } from "@/lib/format";
import { EQUIPMENT } from "@/mocks/equipment";

const PURCHASED = [100, 0, 200, 0, 50, 0, 0, 0];
const DAMAGED = [14, 3, 22, 0, 6, 1, 1, 0];
const LOST = [6, 8, 9, 0, 0, 0, 0, 0];
const RESTORED = [6, 0, 10, 0, 2, 0, 0, 0];
const DISCARDED = [3, 3, 5, 0, 1, 0, 0, 0];
const COMPENSATION = [195000, 25000, 260000, 0, 360000, 0, 0, 0];

export function EquipmentReportTable() {
  return (
    <>
      <PanelHeader
        title="Báo cáo dụng cụ"
        subtitle="Kỳ 01/10/2026 đến 31/10/2026"
        actions={<CheckboxLabel>Chỉ loại dưới ngưỡng</CheckboxLabel>}
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
          num("Phục hồi"),
          num("Loại bỏ"),
          num("Bồi thường"),
        ]}
        rows={EQUIPMENT.map((item, index) => [
          item.name,
          formatNumber(item.owned),
          formatNumber(item.ready),
          formatNumber(item.inUse),
          item.damaged,
          formatNumber(item.minimum),
          PURCHASED[index],
          DAMAGED[index],
          LOST[index],
          RESTORED[index],
          DISCARDED[index],
          formatMoney(COMPENSATION[index]),
        ])}
      />
    </>
  );
}
