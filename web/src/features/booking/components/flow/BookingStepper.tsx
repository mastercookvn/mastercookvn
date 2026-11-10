import type { ComponentType } from "react";

import {
  CalculatorIcon,
  CheckIcon,
  ChecklistIcon,
  ClipboardIcon,
  type IconProps,
} from "@/components/icons";

const STEPS: { label: string; icon: ComponentType<IconProps> }[] = [
  { label: "Tính giá", icon: CalculatorIcon },
  { label: "Chi tiết tiệc", icon: ClipboardIcon },
  { label: "Xem lại", icon: ChecklistIcon },
  { label: "Đã gửi", icon: CheckIcon },
];

export function BookingStepper({ current }: { current: number }) {
  return (
    <div className="stepper">
      {STEPS.map(({ label, icon: Icon }, index) => {
        const step = index + 1;
        const state =
          step < current ? "is-done" : step === current ? "is-active" : "";
        return (
          <div key={label} className={`stepper-item ${state}`}>
            <Icon size={18} />
            {label}
          </div>
        );
      })}
    </div>
  );
}
