"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { EVENT_TYPES } from "@/mocks/catalog";
import { CUSTOMER } from "@/mocks/contracts";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

import { EstimateMealSummary } from "@/features/booking/components/review/EstimateMealSummary";

export function OrderDetailsForm({
  signedIn,
  onBack,
  onContinue,
}: {
  signedIn: boolean;
  onBack: () => void;
  onContinue: () => void;
}) {
  const meals = useDemoState((state) => state.estimate);
  const eventType = useDemoState((state) => state.bookingEventType);

  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack gap-4">
        {meals.map((meal, index) => (
          <EstimateMealSummary
            key={index}
            meal={meal}
            index={index}
            aside={
              <Button size="sm" variant="text" onClick={onBack}>
                Sửa bữa
              </Button>
            }
          />
        ))}
      </div>
      <aside className="card l-stack sticky-side">
        <h3 className="card-title card-title-flush">Thông tin người đặt</h3>
        <TextField
          id="order-customer"
          label="Người đặt"
          hint="Lấy từ tài khoản đăng nhập."
          readOnly
          defaultValue={
            signedIn
              ? `${CUSTOMER.name} · ${CUSTOMER.phone}`
              : "Đăng nhập ở bước gửi đơn"
          }
        />
        <SelectField
          id="order-event-type"
          label="Loại tiệc"
          options={EVENT_TYPES}
          value={eventType}
          onValueChange={(bookingEventType) =>
            updateDemoState({ bookingEventType })
          }
        />
        <TextField
          id="order-note"
          label="Ghi chú cho tư vấn"
          placeholder="Ví dụ: gọi sau 18 giờ"
        />
        <Alert tone="info">
          Bản nháp chỉ giữ trên trình duyệt này cho tới khi bạn gửi đơn.
        </Alert>
        <Button variant="primary" onClick={onContinue}>
          Xem lại đơn
        </Button>
        <Button onClick={onBack}>Quay lại tính giá</Button>
      </aside>
    </div>
  );
}
