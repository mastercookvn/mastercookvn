import { BowlIcon } from "@/components/icons";
import { MaskImage } from "@/components/motion/MaskImage";
import { Reveal } from "@/components/motion/Reveal";
import { formatMoney } from "@/lib/format";
import { dishPhoto, type Dish } from "@/mocks/catalog";

const SIZES = "(max-width: 760px) 50vw, (max-width: 1080px) 50vw, 25vw";

export function DishCard({
  dish,
  index = 0,
}: {
  dish: Dish & { image?: string };
  index?: number;
}) {
  const photo = dishPhoto(dish);

  return (
    <article className="dish-card">
      {photo ? (
        <MaskImage
          src={photo}
          alt={`Minh họa ${dish.name}`}
          sizes={SIZES}
          delayMs={index * 120}
        />
      ) : (
        <span className="media dish-card-placeholder">
          <BowlIcon size={40} />
        </span>
      )}
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
