import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MEAL_STATUS } from "@/constants/statuses";

const MEALS = [
  {
    date: "15/11",
    time: "18:00",
    title: "Họp mặt, 20 bàn ăn",
    status: MEAL_STATUS.Confirmed,
  },
  {
    date: "22/11",
    time: "10:30",
    title: "Tân gia, 12 bàn ăn",
    status: MEAL_STATUS.Preparing,
  },
  {
    date: "28/11",
    time: "18:00",
    title: "Sinh nhật, 8 bàn ăn",
    status: MEAL_STATUS.Planned,
  },
  {
    date: "14/12",
    time: "11:00",
    title: "Tiệc cưới, 30 bàn ăn",
    status: MEAL_STATUS.Planned,
  },
];

export function UpcomingMealList() {
  return (
    <Card>
      <CardTitle>Tiệc sắp tới</CardTitle>
      {MEALS.map((meal) => (
        <div key={meal.date} className="check-row">
          <span>
            <b className="font-semibold">{meal.date}</b> {meal.time}
            <br />
            <span className="text-soft text-small">{meal.title}</span>
          </span>
          <StatusBadge domain="meal" status={meal.status} />
        </div>
      ))}
    </Card>
  );
}
