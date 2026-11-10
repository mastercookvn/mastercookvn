import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";

import { MealCalendar } from "./MealCalendar";

export function CalendarPanel() {
  return (
    <>
      <PanelHeader
        title="Lịch tiệc"
        subtitle="Tháng 11/2026"
        actions={
          <>
            <Button size="sm">Tuần</Button>
            <Button size="sm" variant="primary">
              Tháng
            </Button>
          </>
        }
      />
      <MealCalendar />
      <div className="l-row text-small text-soft">
        <Badge tone="good">Đã xác nhận</Badge>
        <Badge tone="wait">Chờ xử lý</Badge>
      </div>
    </>
  );
}
