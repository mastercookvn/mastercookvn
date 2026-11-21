export type DishCategory =
  "appetizer" | "main" | "hotpot" | "dessert" | "drink";

export const DISH_CATEGORY_LABEL: Record<DishCategory, string> = {
  appetizer: "Khai vị",
  main: "Món chính",
  hotpot: "Lẩu",
  dessert: "Tráng miệng",
  drink: "Đồ uống",
};
