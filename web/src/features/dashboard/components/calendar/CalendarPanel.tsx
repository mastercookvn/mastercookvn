import { PanelHeader } from "@/components/ui/PanelHeader";

import { MealCalendar } from "./MealCalendar";

export function CalendarPanel() {
  return (
    <>
      <PanelHeader
        title="Lịch tiệc"
        subtitle="Xem theo tuần để điều phối, theo tháng để nắm tổng quan"
      />
      <MealCalendar />
    </>
  );
}
