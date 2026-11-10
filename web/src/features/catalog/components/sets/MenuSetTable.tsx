import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";
import { MENU_SETS, menuSetDishNames, menuSetPrice } from "@/mocks/catalog";

export function MenuSetTable() {
  return (
    <>
      <PanelHeader
        title="Set thực đơn"
        subtitle="Giá set bằng tổng giá món, không cộng lợi nhuận lần nữa"
        actions={
          <ToastButton
            variant="primary"
            message="Bản mẫu: mở biểu mẫu thêm set"
          >
            Thêm set
          </ToastButton>
        }
      />
      <DataTable
        columns={[
          "Set",
          "Phù hợp",
          "Số món",
          "Danh sách món",
          num("Giá / bàn chuẩn"),
          "Trạng thái",
        ]}
        rows={MENU_SETS.map((set) => [
          <b key="name">{set.name}</b>,
          set.suitableFor,
          set.dishIds.length,
          <span key="dishes" className="text-small text-soft">
            {menuSetDishNames(set).join(", ")}
          </span>,
          formatMoney(menuSetPrice(set)),
          <Badge key="status" tone="good">
            Đang phục vụ
          </Badge>,
        ])}
      />
    </>
  );
}
