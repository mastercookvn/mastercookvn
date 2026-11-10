import { DataTable, num } from "@/components/ui/DataTable";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_HOUSEWARMING,
  daysUntil,
  MEAL_HOUSEWARMING as meal,
} from "@/mocks/contracts";

import { RefundPreview } from "./RefundPreview";

export function CancelRequestForm() {
  return (
    <>
      <PanelHeader
        title="Hủy bữa"
        subtitle={`${CONTRACT_HOUSEWARMING.number}. Bậc hoàn theo thời điểm khách yêu cầu, không theo lúc nhân viên xử lý.`}
      />
      <div className="l-grid l-grid-2">
        <section className="card l-stack">
          <TextField
            id="cancel-requested-at"
            label="Thời điểm khách yêu cầu"
            defaultValue="05/11/2026 09:00"
          />
          <TextareaField
            id="cancel-workspace-reason"
            label="Lý do"
            defaultValue="Khách đổi kế hoạch, báo qua Zalo."
          />
          <DataTable
            columns={[
              "Bữa",
              "Ngày",
              num("Còn lại"),
              num("Giá trị"),
              "Trạng thái",
            ]}
            rows={[
              [
                meal.name,
                meal.date,
                `${daysUntil(meal.startsAt)} ngày`,
                formatMoney(meal.price.total),
                <StatusBadge key="status" domain="meal" status={meal.status} />,
              ],
            ]}
          />
        </section>
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Kết quả tính</h3>
          <RefundPreview compact />
          <ToastButton
            variant="danger"
            message="Đã hủy bữa, nhả giữ dụng cụ, hủy phân công, ghi khoản phải hoàn"
          >
            Xác nhận hủy
          </ToastButton>
        </section>
      </div>
    </>
  );
}
