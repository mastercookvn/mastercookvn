"use client";

import { BowlIcon } from "@/components/icons";
import { MediaImage } from "@/components/ui/MediaImage";
import { formatMoney } from "@/lib/format";
import {
  DISH_CATEGORY_LABEL,
  type Dish,
  type DishCategory,
} from "@/mocks/catalog";

const CATEGORY_ORDER = Object.keys(DISH_CATEGORY_LABEL) as DishCategory[];

/** Every dish of a set with photo, description and price, grouped by course. */
export function MenuSetDishList({ dishes }: { dishes: readonly Dish[] }) {
  const courses = CATEGORY_ORDER.map((category) => ({
    category,
    dishes: dishes.filter((dish) => dish.category === category),
  })).filter((course) => course.dishes.length > 0);

  return (
    <div className="set-dishes">
      {courses.map((course) => (
        <section key={course.category} className="set-dishes-course">
          <h4>
            {DISH_CATEGORY_LABEL[course.category]}
            <span>{course.dishes.length} món</span>
          </h4>
          <ul>
            {course.dishes.map((dish) => (
              <li key={dish.id} className="set-dish">
                <span className="set-dish-photo">
                  <MediaImage
                    imageKey={dish.imageKey}
                    alt={dish.name}
                    sizes="72px"
                    fallback={<BowlIcon size={24} />}
                  />
                </span>
                <span className="set-dish-text">
                  <b>{dish.name}</b>
                  {dish.description ? <small>{dish.description}</small> : null}
                </span>
                <span className="set-dish-price">
                  {formatMoney(dish.price)}
                  <small>/ bàn chuẩn</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
