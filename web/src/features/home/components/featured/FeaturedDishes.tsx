import { DishCard } from "@/features/menu/components/dishes/DishCard";
import { dishById, FEATURED_DISH_IDS } from "@/mocks/catalog";

import { SectionHeading } from "@/features/home/components/SectionHeading";

export function FeaturedDishes() {
  return (
    <section className="band">
      <div className="block-inner">
        <SectionHeading eyebrow="Món nổi bật" title="Trên bàn tiệc của bạn" />
        <div className="l-grid l-grid-4">
          {FEATURED_DISH_IDS.map((id, index) => (
            <DishCard key={id} dish={dishById(id)} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
