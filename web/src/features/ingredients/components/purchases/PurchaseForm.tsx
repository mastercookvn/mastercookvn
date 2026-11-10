import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";

import { PurchaseLinesTable } from "./PurchaseLinesTable";

export function PurchaseForm() {
  return (
    <>
      <PanelHeader
        title="Phiếu nhập nguyên liệu"
        subtitle="Không gắn với bữa tiệc. Tháng đã chốt không ghi được."
        actions={
          <ToastButton variant="primary" message="Đã lưu phiếu PN-1105-01">
            Lưu phiếu
          </ToastButton>
        }
      />
      <section className="card l-grid l-grid-3">
        <TextField
          id="purchase-date"
          label="Ngày nhập"
          defaultValue="05/11/2026"
        />
        <TextField
          id="purchase-supplier"
          label="Nhà cung cấp"
          defaultValue="Chợ Bà Chiểu"
          hint="Mua ở chợ có thể bỏ trống SĐT."
        />
        <TextField id="purchase-phone" label="SĐT nhà cung cấp" />
      </section>
      <PurchaseLinesTable />
      <div>
        <Button>Thêm dòng</Button>
      </div>
      <p className="text-small text-soft">
        Dòng lệch giá chỉ để lưu ý, không chặn lưu phiếu.
      </p>
    </>
  );
}
