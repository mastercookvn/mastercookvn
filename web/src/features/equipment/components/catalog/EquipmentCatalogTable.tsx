import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { ROLE, type Role } from "@/constants/roles";
import { formatMoney, formatNumber } from "@/lib/format";
import { EQUIPMENT } from "@/mocks/equipment";

export function EquipmentCatalogTable({ roles }: { roles: Role[] }) {
  const canEditCompensation = roles.includes(ROLE.BranchManager);

  return (
    <>
      <PanelHeader
        title="Danh mục dụng cụ"
        subtitle="Lượng tồn tăng qua phiếu nhập mua. Giá bồi thường chỉ Quản lý cơ sở được sửa."
        actions={
          <ToastButton
            variant="primary"
            message="Bản mẫu: mở biểu mẫu thêm dụng cụ"
          >
            Thêm dụng cụ
          </ToastButton>
        }
      />
      <DataTable
        columns={[
          "Dụng cụ",
          "Đơn vị",
          "Cơ sở định mức",
          num("Định mức"),
          num("Dự trù"),
          num("Tối thiểu"),
          num("Giá bồi thường"),
        ]}
        rows={EQUIPMENT.map((item, index) => [
          item.name,
          item.unit,
          item.basis,
          item.rate ?? "Nhập tay",
          item.reserve ? `${Math.round(item.reserve * 100)}%` : "Trống",
          formatNumber(item.minimum),
          canEditCompensation ? (
            <input
              key="compensation"
              id={`compensation-${index}`}
              className="input-cell w-[120px] max-w-[120px]"
              defaultValue={formatNumber(item.compensation)}
              aria-label={`Giá bồi thường ${item.name}`}
            />
          ) : (
            formatMoney(item.compensation)
          ),
        ])}
      />
    </>
  );
}
