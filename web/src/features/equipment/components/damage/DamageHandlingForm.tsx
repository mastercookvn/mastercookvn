import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { EQUIPMENT } from "@/mocks/equipment";

export function DamageHandlingForm() {
  return (
    <>
      <PanelHeader
        title="Xử lý đồ hư"
        subtitle="Phục hồi về sẵn sàng hoặc loại bỏ khỏi sở hữu"
      />
      <section className="card l-stack max-w-[640px]">
        <div className="l-grid l-grid-2">
          <SelectField
            id="damage-type"
            label="Loại dụng cụ"
            options={EQUIPMENT.filter((item) => item.damaged).map(
              (item) => `${item.name} (hư ${item.damaged})`,
            )}
            defaultValue="Bát ăn sứ (hư 20)"
          />
          <SelectField
            id="damage-action"
            label="Xử lý"
            options={["Phục hồi về sẵn sàng", "Loại bỏ khỏi sở hữu"]}
            defaultValue="Phục hồi về sẵn sàng"
          />
          <TextField
            id="damage-quantity"
            label="Lượng"
            defaultValue="8"
            hint="Không vượt lượng hư hiện có."
          />
          <TextField
            id="damage-reason"
            label="Lý do"
            defaultValue="Đã vá men, dùng lại được"
          />
        </div>
        <div className="l-row justify-end">
          <ToastButton
            variant="primary"
            message="Đã cập nhật lượng hư và sẵn sàng"
          >
            Lưu xử lý
          </ToastButton>
        </div>
      </section>
    </>
  );
}
