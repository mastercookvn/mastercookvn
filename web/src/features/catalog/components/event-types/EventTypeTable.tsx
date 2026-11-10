import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { EVENT_TYPES } from "@/mocks/catalog";

export function EventTypeTable() {
  return (
    <>
      <PanelHeader
        title="Loại tiệc"
        subtitle="Dùng để lọc và báo cáo"
        actions={
          <ToastButton
            variant="primary"
            message="Bản mẫu: mở biểu mẫu thêm mới"
          >
            Thêm loại tiệc
          </ToastButton>
        }
      />
      <DataTable
        columns={["Loại tiệc", "Trạng thái"]}
        rows={EVENT_TYPES.map((name) => [
          name,
          <Badge key="status" tone="good">
            Đang sử dụng
          </Badge>,
        ])}
      />
    </>
  );
}
