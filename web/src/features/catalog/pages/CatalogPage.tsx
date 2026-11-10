import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { DishesPanel } from "../components/dishes/DishesPanel";
import { EventTypeTable } from "../components/event-types/EventTypeTable";
import { ServiceTable } from "../components/services/ServiceTable";
import { MenuSetTable } from "../components/sets/MenuSetTable";

export function CatalogPage() {
  return (
    <WorkspaceTabs
      screen="catalog"
      panels={{
        dishes: <DishesPanel />,
        sets: <MenuSetTable />,
        services: <ServiceTable />,
        "event-types": <EventTypeTable />,
      }}
    />
  );
}
