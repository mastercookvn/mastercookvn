"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useToast } from "@/components/ui/Toast";
import { LIVE_VALIDATION_MODE } from "@/lib/validation";
import { NEW_ESTIMATE_MEAL } from "@/lib/demoStore";

import { CustomerLookupForm } from "./CustomerLookupForm";
import { OnBehalfMealForm } from "./OnBehalfMealForm";
import { onBehalfSchema } from "./onBehalfSchema";
import { OrderSummary } from "./OrderSummary";

export function OnBehalfOrderForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [meal, setMeal] = useState(NEW_ESTIMATE_MEAL);
  const form = useForm({
    resolver: zodResolver(onBehalfSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      customerPhone: "",
      customerName: "",
      address: "",
    },
  });

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        className="l-grid l-grid-main"
        noValidate
        onSubmit={form.handleSubmit(() => {
          showToast("Đã tạo đơn, trạng thái Chờ xác nhận");
          onSaved();
        })}
      >
        <div className="l-stack gap-4">
          <CustomerLookupForm />
          <OnBehalfMealForm
            meal={meal}
            onChange={(patch) => setMeal({ ...meal, ...patch })}
          />
        </div>
        <OrderSummary meal={meal} />
      </form>
    </FormProvider>
  );
}
