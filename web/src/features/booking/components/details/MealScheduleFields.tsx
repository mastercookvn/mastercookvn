import { TextField } from "@/components/ui/TextField";
import { formatMoney } from "@/lib/format";
import type { Meal } from "@/mocks/contracts";

export function MealScheduleFields({
  meal,
  index,
}: {
  meal: Meal;
  index: number;
}) {
  return (
    <section className="card l-stack">
      <div className="l-between">
        <h3 className="card-title card-title-flush">
          Bữa {index + 1}: {meal.name}
        </h3>
        <span className="price">{formatMoney(meal.price.total)}</span>
      </div>
      <div className="l-grid l-grid-3">
        <TextField
          id={`meal-date-${index}`}
          label="Ngày"
          defaultValue={meal.date}
        />
        <TextField
          id={`meal-time-${index}`}
          label="Giờ bắt đầu, kết thúc"
          defaultValue={meal.time}
        />
        <TextField
          id={`meal-address-${index}`}
          label="Địa chỉ"
          defaultValue={meal.address}
        />
      </div>
      <p className="text-small text-soft">
        {meal.servingTables} bàn ăn, {meal.guestsPerTable} người mỗi bàn,{" "}
        {meal.setupTables} bàn bố trí · {meal.setName} ·{" "}
        {meal.services.map((service) => service.name).join(", ")}
      </p>
    </section>
  );
}
