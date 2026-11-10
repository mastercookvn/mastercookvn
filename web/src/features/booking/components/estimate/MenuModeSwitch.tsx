"use client";

import type { EstimateMeal } from "@/mocks/demoStore";

export function MenuModeSwitch({
  mode,
  onChange,
}: {
  mode: EstimateMeal["mode"];
  onChange: (mode: EstimateMeal["mode"]) => void;
}) {
  return (
    <div className="segmented" role="group" aria-label="Cách chọn thực đơn">
      <button
        type="button"
        aria-pressed={mode === "set"}
        onClick={() => onChange("set")}
      >
        Chọn set có sẵn
      </button>
      <button
        type="button"
        aria-pressed={mode === "custom"}
        onClick={() => onChange("custom")}
      >
        Tự chọn món
      </button>
    </div>
  );
}
