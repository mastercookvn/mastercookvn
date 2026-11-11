"use client";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

import { useWorkspaceOrder } from "@/features/orders/lib/useOrders";

import { EquipmentCapacityTable } from "./EquipmentCapacityTable";
import { StaffCapacityTable } from "./StaffCapacityTable";

export function CapacityCheck({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  const shortage = useDemoState((state) => state.simulateShortage);
  if (!order) return null;

  return (
    <>
      <div className="l-between">
        <p className="text-soft text-small">
          Đã loại giữ tạm hết hạn, cộng nhu cầu mọi bữa chồng giờ.
        </p>
        <CheckboxLabel
          checked={shortage}
          onChange={(event) =>
            updateDemoState({ simulateShortage: event.target.checked })
          }
        >
          Giả lập thiếu tài nguyên
        </CheckboxLabel>
      </div>
      {order.mealDetails.map((meal, index) => (
        <section key={index} className="l-stack gap-2">
          <h3 className="card-title card-title-flush">
            Bữa {index + 1}, {meal.date} {meal.time}
          </h3>
          <EquipmentCapacityTable meal={meal} />
          <StaffCapacityTable meal={meal} />
        </section>
      ))}
    </>
  );
}
