import type { DishCategory } from "@/constants/catalog";
import type { MediaKey } from "@/lib/media";

/** Prices are per standard 10-person table. */
export type Dish = {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  imageKey?: MediaKey;
};

export type CatalogDish = Dish & {
  active: boolean;
};

export type MenuSet = {
  id: string;
  name: string;
  suitableFor: string;
  description: string;
  dishIds: string[];
  imageDishId: string;
  /** Missing means active. */
  active?: boolean;
};

export type Service = {
  id: string;
  name: string;
  unit: string;
  price: number;
  description: string;
  /** The card shows the service icon until it is set. */
  imageKey?: MediaKey;
  /** Missing means active. */
  active?: boolean;
};

/** BR04: a set costs the current selling price of its dishes, no extra margin. */
export const menuSetPriceFrom = (
  set: Pick<MenuSet, "dishIds">,
  dishes: readonly Pick<Dish, "id" | "price">[]
) =>
  set.dishIds.reduce(
    (sum, id) => sum + (dishes.find((dish) => dish.id === id)?.price ?? 0),
    0
  );

export const menuSetDishes = <T extends Pick<Dish, "id">>(
  set: MenuSet,
  dishes: readonly T[]
) => set.dishIds.flatMap((id) => dishes.find((dish) => dish.id === id) ?? []);
