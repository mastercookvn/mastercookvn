import { MaskImage } from "@/components/motion/MaskImage";
import { Reveal } from "@/components/motion/Reveal";
import { formatMoney } from "@/lib/format";
import {
  menuSetDishes,
  menuSetPriceFrom,
  type Dish,
  type MenuSet,
} from "@/models/catalog";

import { ChooseSetButton } from "./ChooseSetButton";
import { MenuSetDetailsDialog } from "./MenuSetDetailsDialog";

export function MenuSetCard({
  set,
  dishes,
  index = 0,
}: {
  set: MenuSet;
  dishes: readonly Dish[];
  index?: number;
}) {
  const setDishes = menuSetDishes(set, dishes);
  const price = menuSetPriceFrom(set, dishes);

  return (
    <article className="set-card">
      <MaskImage
        imageKey={dishes.find((dish) => dish.id === set.imageDishId)?.imageKey}
        alt={`Minh họa ${set.name}`}
        sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw"
        delayMs={index * 120}
      />
      <Reveal
        variant="up"
        delayMs={index * 120 + 500}
        className="set-card-head"
      >
        <h3>{set.name}</h3>
        <div className="set-card-price">{formatMoney(price)}</div>
        <small>
          một bàn 10 người · {set.dishIds.length} món · {set.suitableFor}
        </small>
      </Reveal>
      <Reveal
        variant="up"
        delayMs={index * 120 + 620}
        className="set-card-body"
      >
        <ul>
          {setDishes.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
        <p className="text-soft text-small flex-1">{set.description}</p>
        <div className="set-card-actions">
          <MenuSetDetailsDialog set={set} dishes={setDishes} price={price} />
          <ChooseSetButton setId={set.id} />
        </div>
      </Reveal>
    </article>
  );
}
