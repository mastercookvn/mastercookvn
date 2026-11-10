import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatNumber } from "@/lib/format";
import { EQUIPMENT } from "@/mocks/equipment";

export function StockTable() {
  return (
    <>
      <PanelHeader
        title="Tồn kho"
        subtitle="Sở hữu = sẵn sàng + đang sử dụng + hư"
      />
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
        rows={EQUIPMENT.map((item) => [
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
