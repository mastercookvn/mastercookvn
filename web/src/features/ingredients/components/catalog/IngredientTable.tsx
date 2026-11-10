import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";
import { INGREDIENTS } from "@/mocks/inventory";

export function IngredientTable() {
  return (
    <>
      <PanelHeader
        title="Nguyên liệu"
        subtitle="Sửa giá trực tiếp sẽ liệt kê món bị ảnh hưởng"
        actions={
          <ToastButton
            variant="primary"
            message="Bản mẫu: mở biểu mẫu thêm nguyên liệu"
          >
            Thêm nguyên liệu
          </ToastButton>
        }
      />
      <DataTable
        columns={[
          "Nguyên liệu",
          "Đơn vị chuẩn",
          num("Giá hiện hành"),
          "Dùng trong món",
          "Trạng thái",
        ]}
        rows={INGREDIENTS.map((row) => [
          row.name,
          row.unit,
          formatMoney(row.price),
          <span key="used" className="text-small text-soft">
            {row.usedIn}
          </span>,
          <Badge key="status" tone="good">
            Đang dùng
          </Badge>,
        ])}
      />
    </>
  );
}
