import type { CSSProperties } from "react";

import { CheckIcon } from "@/components/icons";

export function BookingStepper({
  steps,
  current,
  onSelect,
}: {
  steps: string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol
      className="stepper"
      style={{ "--steps": steps.length } as CSSProperties}
    >
      {steps.map((label, index) => {
        const done = index < current;
        return (
          <li key={label}>
            <button
              type="button"
              className={`stepper-item ${done ? "is-done" : index === current ? "is-active" : ""}`}
              aria-current={index === current ? "step" : undefined}
              disabled={!done}
              onClick={() => onSelect(index)}
            >
              <span className="stepper-number">
                {done ? <CheckIcon size={14} /> : index + 1}
              </span>
              {label}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
