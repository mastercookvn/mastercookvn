"use client";

import { Button } from "@/components/ui/Button";
import type { EstimateMeal } from "@/mocks/demoStore";

export function MenuModeSwitch({
  mode,
  onChange,
}: {
  mode: EstimateMeal["mode"];
  onChange: (mode: EstimateMeal["mode"]) => void;
}) {
  return (
    <div className="l-row gap-1.5">
      <Button
        size="sm"
        variant={mode === "set" ? "inverse" : "default"}
        onClick={() => onChange("set")}
      >
        Chọn set
      </Button>
      <Button
        size="sm"
        variant={mode === "custom" ? "inverse" : "default"}
        onClick={() => onChange("custom")}
      >
        Tự chọn món
      </Button>
    </div>
  );
}
