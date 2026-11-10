"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { EVENT_TYPES } from "@/mocks/catalog";
import { CONTRACT_WEDDING, CUSTOMER } from "@/mocks/contracts";

import { MealScheduleFields } from "./MealScheduleFields";

export function OrderDetailsForm({
  signedIn,
  onBack,
  onContinue,
}: {
  signedIn: boolean;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="l-stack gap-4">
      <section className="card l-grid l-grid-3">
        <TextField
          id="order-customer"
          label="Người đặt"
          hint="Lấy từ tài khoản đăng nhập."
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
          defaultValue="Cưới hỏi"
        />
        <TextField
          id="order-note"
          label="Ghi chú chung"
          defaultValue="Xin tư vấn gọi sau 18 giờ"
        />
      </section>
      {CONTRACT_WEDDING.meals.map((meal, index) => (
        <MealScheduleFields key={meal.name} meal={meal} index={index} />
      ))}
      <Alert tone="info">
        Bản nháp chỉ giữ trên trình duyệt này, hệ thống chưa lưu cho tới khi bạn
        gửi đơn.
      </Alert>
      <div className="l-between">
        <Button onClick={onBack}>Quay lại tính giá</Button>
        <Button variant="primary" onClick={onContinue}>
          Xem lại đơn
        </Button>
      </div>
    </div>
  );
}
