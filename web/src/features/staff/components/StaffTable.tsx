import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { STAFF } from "@/mocks/people";

import { StaffFormDialog } from "./StaffFormDialog";

export function StaffTable() {
  return (
    <>
      <PanelHeader
        title="Hồ sơ nhân sự"
        subtitle="Hồ sơ độc lập với tài khoản đăng nhập"
        actions={<StaffFormDialog />}
      />
      <DataTable
        columns={[
          "Họ tên",
          "SĐT",
          "Loại",
          "Vị trí",
          "Có tài khoản",
          "Trạng thái",
          "",
        ]}
        rows={STAFF.map((member) => [
          member.name,
          member.phone,
          member.type,
          member.position,
          member.hasAccount ? "Có" : "Không",
          member.active ? (
            <Badge key="status" tone="good">
              Đang làm
            </Badge>
          ) : (
            <Badge key="status" tone="neutral">
              Ngưng làm
            </Badge>
          ),
          <ToastButton
            key="history"
            size="sm"
            message={`Bản mẫu: mở lịch sử phân công của ${member.name}`}
          >
            Lịch sử
          </ToastButton>,
        ])}
      />
    </>
  );
}
