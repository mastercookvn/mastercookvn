"use client";

import { useWorkspaceOrder } from "@/features/orders/lib/useOrders";

import { EquipmentCapacityTable } from "./EquipmentCapacityTable";
import { StaffCapacityTable } from "./StaffCapacityTable";

export function CapacityCheck({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  if (!order) return null;

  return (
    <>
      <p className="text-soft text-small">
        Đã loại giữ tạm hết hạn, cộng nhu cầu mọi bữa chồng giờ.
      </p>
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
