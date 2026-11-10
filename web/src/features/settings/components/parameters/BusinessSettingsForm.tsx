import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { BUSINESS_SETTINGS as settings } from "@/constants/settings";
import { formatPercent } from "@/lib/format";
import { INVENTORY_PERIOD } from "@/mocks/inventory";

export function BusinessSettingsForm() {
  return (
    <>
      <PanelHeader
        title="Tham số nghiệp vụ"
        subtitle="Áp dụng cho dữ liệu mới từ lúc lưu, không đổi cam kết đã chốt"
        actions={
          <ToastButton
            variant="primary"
            message="Đã lưu tham số kèm người sửa và thời điểm áp dụng"
          >
            Lưu tham số
          </ToastButton>
        }
      />
      <div className="l-grid l-grid-3">
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Giá</h3>
          <TextField
            id="setting-food-cost"
            label="Food cost mục tiêu (%)"
            defaultValue={settings.foodCostTarget * 100}
            hint={`Gợi ý sau chốt 10/2026: ${formatPercent(INVENTORY_PERIOD.foodCost)}`}
          />
          <TextField
            id="setting-tax"
            label="Thuế suất (%)"
            defaultValue={settings.taxRate * 100}
            hint="Giá trị minh họa, chưa phải mức pháp định."
          />
        </section>
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Nhận tiệc và cọc</h3>
          <TextField
            id="setting-radius"
            label="Phạm vi tối đa (km)"
            defaultValue={settings.serviceRadiusKm}
          />
          <TextField
            id="setting-hold"
            label="Hạn giữ chỗ (giờ)"
            defaultValue={settings.holdHours}
          />
          <TextField
            id="setting-deposit"
            label="Cọc tối thiểu (%)"
            defaultValue={settings.minimumDepositRate * 100}
          />
          <TextField
            id="setting-servers"
            label="Số bàn bố trí / 1 người phục vụ"
            defaultValue={settings.tablesPerServer}
          />
        </section>
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Điều chỉnh và hủy</h3>
          <TextField
            id="setting-dish-cutoff"
            label="Mốc đổi món (ngày)"
            defaultValue={settings.dishChangeCutoffDays}
          />
          <TextField
            id="setting-table-cutoff"
            label="Mốc đổi bàn (ngày)"
            defaultValue={settings.tableChangeCutoffDays}
          />
          <TextField
            id="setting-reduction"
            label="Giảm bàn tối đa (%)"
            defaultValue={settings.maxTableReductionRate * 100}
          />
          <TextField
            id="setting-tier-1"
            label="Bậc hoàn: từ 30 ngày (%)"
            defaultValue={100}
          />
          <TextField
            id="setting-tier-2"
            label="Bậc hoàn: 15 đến dưới 30 ngày (%)"
            defaultValue={50}
          />
          <TextField
            id="setting-tier-3"
            label="Bậc hoàn: dưới 15 ngày (%)"
            defaultValue={0}
          />
        </section>
      </div>
      <p className="text-small text-soft">
        Ngày lễ và phụ thu lễ dùng danh sách cố định, không sửa tại đây.
      </p>
    </>
  );
}
