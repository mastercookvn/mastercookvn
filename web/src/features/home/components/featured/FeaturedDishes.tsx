"use client";

import { DishCard } from "@/features/menu/components/dishes/DishCard";
import { useDemoState } from "@/lib/demoStore";

import { SectionHeading } from "@/features/home/components/SectionHeading";

const FEATURED_DISH_COUNT = 4;

export function FeaturedDishes() {
  const dishes = useDemoState((state) => state.dishes);
  const featured = dishes
    .filter((dish) => dish.active)
    .slice(0, FEATURED_DISH_COUNT);

  if (!featured.length) return null;

  return (
    <section className="band">
      <div className="block-inner">
        <SectionHeading eyebrow="Món nổi bật" title="Trên bàn tiệc của bạn" />
        <div className="l-grid l-grid-4">
          {featured.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
