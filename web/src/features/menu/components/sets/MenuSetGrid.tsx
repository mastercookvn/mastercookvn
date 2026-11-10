import { MENU_SETS } from "@/mocks/catalog";

import { MenuSetCard } from "./MenuSetCard";

export function MenuSetGrid() {
  return (
    <div className="l-grid l-grid-3">
      {MENU_SETS.map((set, index) => (
        <MenuSetCard key={set.id} set={set} index={index} />
      ))}
    </div>
  );
}
