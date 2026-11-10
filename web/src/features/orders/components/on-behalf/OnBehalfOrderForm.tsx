"use client";

import { useToast } from "@/components/ui/Toast";

import { CustomerLookupForm } from "./CustomerLookupForm";
import { OnBehalfMealForm } from "./OnBehalfMealForm";
import { OrderSummary } from "./OrderSummary";

export function OnBehalfOrderForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const showToast = useToast();

  return (
    <form
      id={formId}
      className="l-grid l-grid-main"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        showToast("Đã tạo đơn DH-0151, trạng thái Chờ xác nhận");
        onSaved();
      }}
    >
      <div className="l-stack gap-4">
        <CustomerLookupForm />
        <OnBehalfMealForm />
      </div>
      <OrderSummary />
    </form>
  );
}
