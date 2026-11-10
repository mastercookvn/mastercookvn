"use client";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

import { EquipmentCapacityTable } from "./EquipmentCapacityTable";
import { StaffCapacityTable } from "./StaffCapacityTable";

export function CapacityCheck() {
  const shortage = useDemoState((state) => state.simulateShortage);

  return (
    <>
      <div className="l-between">
        <p className="text-soft text-small">
          Bữa 1, khung 14/12 06:00–17:00. Đã loại giữ tạm hết hạn, cộng nhu cầu
          mọi bữa chồng giờ.
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
      <EquipmentCapacityTable />
      <StaffCapacityTable />
    </>
  );
}
