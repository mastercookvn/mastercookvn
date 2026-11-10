import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";
import { SERVICES } from "@/mocks/catalog";

export function ServiceTable() {
  return (
    <>
      <PanelHeader
        title="Dịch vụ"
        subtitle="Đã có lịch sử thì chỉ ngưng, không xóa"
        actions={
          <ToastButton
            variant="primary"
            message="Bản mẫu: mở biểu mẫu thêm mới"
          >
            Thêm dịch vụ
          </ToastButton>
        }
      />
      <DataTable
        columns={["Dịch vụ", "Mô tả", "Đơn vị", num("Đơn giá"), "Trạng thái"]}
        rows={SERVICES.map((service) => [
          service.name,
          <span key="description" className="text-small text-soft">
            {service.description}
          </span>,
          service.unit,
          formatMoney(service.price),
          <Badge key="status" tone="good">
            Đang cung cấp
          </Badge>,
        ])}
      />
    </>
  );
}
