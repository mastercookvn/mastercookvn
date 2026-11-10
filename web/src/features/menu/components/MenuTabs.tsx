import { Suspense } from "react";

import { Alert } from "@/components/ui/Alert";
import { Tabs } from "@/components/ui/Tabs";

import { DishGrid } from "@/features/menu/components/dishes/DishGrid";
import { MenuSetGrid } from "@/features/menu/components/sets/MenuSetGrid";

const ITEMS = [
  { value: "dishes", label: "Món ăn" },
  { value: "sets", label: "Set thực đơn" },
];

export function MenuTabs() {
  return (
    <Tabs
      items={ITEMS}
      panelClassName="tab-panel page-stack"
      panels={{
        dishes: (
          <>
            <Suspense fallback={null}>
              <DishGrid />
            </Suspense>
            <Alert tone="info">
              Tự chọn món cần ít nhất 6 món đang phục vụ. Bạn chọn món ở bước
              tính giá.
            </Alert>
          </>
        ),
        sets: <MenuSetGrid />,
      }}
    />
  );
}
