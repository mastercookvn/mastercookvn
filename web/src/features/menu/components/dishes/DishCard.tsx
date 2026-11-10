import { MaskImage } from "@/components/motion/MaskImage";
import { Reveal } from "@/components/motion/Reveal";
import { formatMoney } from "@/lib/format";
import { dishImage, type Dish } from "@/mocks/catalog";

const SIZES = "(max-width: 760px) 50vw, (max-width: 1080px) 50vw, 25vw";

export function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  return (
    <article className="dish-card">
      <MaskImage
        src={dishImage(dish.id)}
        alt={`Minh họa ${dish.name}`}
        sizes={SIZES}
        delayMs={index * 120}
      />
      <Reveal
        variant="up"
        delayMs={index * 120 + 500}
        className="dish-card-body"
      >
        <h4>{dish.name}</h4>
        <p className="text-soft text-small flex-1">{dish.description}</p>
        <span className="price">
          {formatMoney(dish.price)} <small>/ bàn chuẩn</small>
        </span>
      </Reveal>
    </article>
  );
}
