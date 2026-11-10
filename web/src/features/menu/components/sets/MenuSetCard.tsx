import { MaskImage } from "@/components/motion/MaskImage";
import { Reveal } from "@/components/motion/Reveal";
import { formatMoney } from "@/lib/format";
import {
  dishImage,
  menuSetDishNames,
  menuSetPrice,
  type MenuSet,
} from "@/mocks/catalog";

import { ChooseSetButton } from "./ChooseSetButton";

export function MenuSetCard({
  set,
  index = 0,
}: {
  set: MenuSet;
  index?: number;
}) {
  return (
    <article className="set-card">
      <MaskImage
        src={dishImage(set.imageDishId)}
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
        <div className="set-card-price">{formatMoney(menuSetPrice(set))}</div>
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
          {menuSetDishNames(set).map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="text-soft text-small flex-1">{set.description}</p>
        <ChooseSetButton setId={set.id} />
      </Reveal>
    </article>
  );
}
