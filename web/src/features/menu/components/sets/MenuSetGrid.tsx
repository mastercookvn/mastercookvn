"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/lib/demoStore";

import { MenuSetCard } from "./MenuSetCard";

export function MenuSetGrid() {
  const menuSets = useDemoState((state) => state.menuSets);
  const dishes = useDemoState((state) => state.dishes);
  const activeSets = menuSets.filter((set) => set.active !== false);

  if (!activeSets.length) {
    return <EmptyState>Chưa có set thực đơn nào.</EmptyState>;
  }

  return (
    <div className="l-grid l-grid-3">
      {activeSets.map((set, index) => (
        <MenuSetCard key={set.id} set={set} dishes={dishes} index={index} />
      ))}
    </div>
  );
}
