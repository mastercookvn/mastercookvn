"use client";

import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import { DEFAULT_DISH_IDS, type EstimateMeal } from "@/mocks/demoStore";

import { CustomerLookupForm } from "./CustomerLookupForm";
import { OnBehalfMealForm } from "./OnBehalfMealForm";
import { OrderSummary } from "./OrderSummary";

const SAMPLE_MEAL: EstimateMeal = {
  format: SERVING_FORMAT.Waves,
  name: "",
  date: "28/11/2026",
  address: "9 Hoa Sứ, Phú Nhuận, TP.HCM",
  guestsPerTable: 10,
  waves: [{ from: "18:00", to: "21:00", tables: 8 }],
  mode: MENU_MODE.Set,
  setId: "sumvay",
  dishIds: DEFAULT_DISH_IDS,
  serviceIds: ["don"],
};

export function OnBehalfOrderForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [meal, setMeal] = useState(SAMPLE_MEAL);

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
        <OnBehalfMealForm
          meal={meal}
          onChange={(patch) => setMeal({ ...meal, ...patch })}
        />
      </div>
      <OrderSummary meal={meal} />
    </form>
  );
}
