import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { ToastButton } from "@/components/ui/ToastButton";
import type { OperationMeal } from "@/mocks/operationMeals";
import { activeStaffOptions } from "@/mocks/people";

export function AssignmentForm({ meal }: { meal: OperationMeal }) {
  return (
    <section className="card l-stack gap-2">
      <h3 className="card-title card-title-flush">Thêm phân công</h3>
      <SelectField
        id="assign-staff"
        label="Nhân viên đang làm"
        options={activeStaffOptions()}
        defaultValue="Vũ Thu Trang · Phục vụ"
      />
      <div className="l-grid l-grid-2">
        <SelectField
          id="assign-position"
          label="Vị trí"
          options={["Phục vụ", "Bếp", "Vận chuyển", "Kiểm đếm"]}
          defaultValue="Phục vụ"
        />
        <TextField id="assign-task" label="Nhiệm vụ" defaultValue="Khu B" />
        <TextField
          id="assign-from"
          label="Từ"
          defaultValue={meal.time.slice(0, 5)}
        />
        <TextField
          id="assign-to"
          label="Đến"
          defaultValue={meal.time.slice(6)}
        />
      </div>
      <ToastButton
        variant="primary"
        message="Đã lưu phân công. Báo nhân viên qua Zalo hoặc điện thoại."
      >
        Lưu phân công
      </ToastButton>
      <p className="text-small text-soft">
        Trùng giờ sẽ bị từ chối. Gợi ý không chặn cứng.
      </p>
    </section>
  );
}
