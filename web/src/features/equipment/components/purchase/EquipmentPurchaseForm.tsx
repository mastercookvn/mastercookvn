import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";

export function EquipmentPurchaseForm() {
  return (
    <>
      <PanelHeader
        title="Phiếu nhập mua dụng cụ"
        subtitle="Hệ thống gợi ý các loại đang dưới tồn tối thiểu"
      />
      <section className="card l-stack">
        <div className="l-grid l-grid-3">
          <TextField
            id="equipment-date"
            label="Ngày"
            defaultValue="05/11/2026"
          />
          <TextField
            id="equipment-supplier"
            label="Nhà cung cấp"
            defaultValue="Inox Thành Tâm"
          />
          <TextField
            id="equipment-phone"
            label="SĐT"
            defaultValue="0283 111 222"
          />
        </div>
        <DataTable
          columns={["Dụng cụ", num("Lượng"), num("Đơn giá"), num("Thành tiền")]}
          rows={[
            [
              <>
                Khay inox <Badge tone="wait">Gợi ý: dưới tối thiểu</Badge>
              </>,
              30,
              formatMoney(150000),
              formatMoney(4500000),
            ],
            ["Ly thủy tinh", 200, formatMoney(15000), formatMoney(3000000)],
          ]}
          foot={
            <>
              <td colSpan={3}>Tổng phiếu</td>
              <td className="is-num">{formatMoney(7500000)}</td>
            </>
          }
        />
        <div className="l-row justify-end">
          <ToastButton
            variant="primary"
            message="Đã nhập mua, tăng sở hữu và sẵn sàng"
          >
            Lưu phiếu
          </ToastButton>
        </div>
      </section>
    </>
  );
}
