import { PanelHeader } from "@/components/ui/PanelHeader";

import { MealCalendar } from "./MealCalendar";

export function CalendarPanel() {
  return (
    <>
      <PanelHeader title="Lịch tiệc" />
      <MealCalendar />
    </>
  );
}
