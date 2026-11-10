/* Sample data. Prices are per standard 10-person table. */
export type DishCategory =
  "appetizer" | "main" | "hotpot" | "dessert" | "drink";

export type Dish = {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
};

export type MenuSet = {
  id: string;
  name: string;
  suitableFor: string;
  description: string;
  dishIds: string[];
  imageDishId: string;
};

export type Service = {
  id: string;
  name: string;
  unit: string;
  price: number;
  description: string;
  /** Path under /images/services. The card shows the service icon until it is set. */
  image?: string;
};

export const DISH_CATEGORY_LABEL: Record<DishCategory, string> = {
  appetizer: "Khai vị",
  main: "Món chính",
  hotpot: "Lẩu",
  dessert: "Tráng miệng",
  drink: "Đồ uống",
};

export const DISHES: Dish[] = [
  {
    id: "goi",
    name: "Gỏi ngó sen tôm thịt",
    category: "appetizer",
    price: 320000,
    description: "Ngó sen giòn, tôm đất, thịt ba chỉ, rau răm",
  },
  {
    id: "chagio",
    name: "Chả giò rế hải sản",
    category: "appetizer",
    price: 280000,
    description: "Vỏ rế chiên giòn, nhân tôm mực",
  },
  {
    id: "sup",
    name: "Súp cua măng tây",
    category: "appetizer",
    price: 240000,
    description: "Thịt cua, măng tây xanh, trứng cút",
  },
  {
    id: "ga",
    name: "Gà hấp lá chanh",
    category: "main",
    price: 420000,
    description: "Gà ta nguyên con, lá chanh, muối tiêu chanh",
  },
  {
    id: "bo",
    name: "Bò lúc lắc khoai tây",
    category: "main",
    price: 520000,
    description: "Thăn bò Úc, khoai tây chiên, ớt chuông",
  },
  {
    id: "ca",
    name: "Cá diêu hồng chưng tương",
    category: "main",
    price: 380000,
    description: "Cá tươi, tương hột, nấm, gừng",
  },
  {
    id: "tom",
    name: "Tôm sú hấp bia",
    category: "main",
    price: 560000,
    description: "Tôm sú size lớn, sả, bia",
  },
  {
    id: "heo",
    name: "Heo quay da giòn",
    category: "main",
    price: 460000,
    description: "Ba chỉ quay, da nổ, dưa chua",
  },
  {
    id: "xoi",
    name: "Xôi gấc",
    category: "main",
    price: 120000,
    description: "Nếp cái hoa vàng, gấc, đậu xanh",
  },
  {
    id: "lauthai",
    name: "Lẩu Thái hải sản",
    category: "hotpot",
    price: 520000,
    description: "Tôm, mực, nghêu, nấm, rau nhúng",
  },
  {
    id: "laugaa",
    name: "Lẩu gà lá é",
    category: "hotpot",
    price: 450000,
    description: "Gà ta, lá é, măng chua, bún tươi",
  },
  {
    id: "che",
    name: "Chè hạt sen long nhãn",
    category: "dessert",
    price: 120000,
    description: "Hạt sen tươi, long nhãn, đường phèn",
  },
  {
    id: "traicay",
    name: "Trái cây theo mùa",
    category: "dessert",
    price: 150000,
    description: "Ba loại trái cây tươi cắt sẵn",
  },
  {
    id: "nuoc",
    name: "Nước ngọt",
    category: "drink",
    price: 120000,
    description: "Mười lon các loại, kèm đá",
  },
  {
    id: "atiso",
    name: "Trà atiso",
    category: "drink",
    price: 80000,
    description: "Trà atiso Đà Lạt ướp lạnh",
  },
];

export const MENU_SETS: MenuSet[] = [
  {
    id: "sumvay",
    name: "Set Sum Vầy",
    suitableFor: "Họp mặt, tân gia, giỗ",
    description: "Bảy món quen thuộc cho buổi họp mặt gia đình.",
    dishIds: ["goi", "chagio", "ga", "ca", "laugaa", "xoi", "traicay"],
    imageDishId: "ga",
  },
  {
    id: "hysu",
    name: "Set Hỷ Sự",
    suitableFor: "Cưới hỏi",
    description: "Tám món đầy đặn, có tôm sú và bò lúc lắc.",
    dishIds: ["sup", "goi", "tom", "bo", "heo", "lauthai", "che", "nuoc"],
    imageDishId: "tom",
  },
  {
    id: "tatnien",
    name: "Set Tất Niên",
    suitableFor: "Tất niên, sinh nhật",
    description: "Sáu món dễ ăn, phục vụ nhanh cho tiệc công ty.",
    dishIds: ["chagio", "ga", "bo", "lauthai", "xoi", "traicay"],
    imageDishId: "bo",
  },
];

export const SERVICES: Service[] = [
  {
    id: "don",
    name: "Dọn dẹp sau tiệc",
    unit: "gói",
    price: 1500000,
    description: "Thu dọn, vệ sinh khu vực tiệc sau khi kết thúc",
  },
  {
    id: "cong",
    name: "Trang trí cổng hoa",
    unit: "cổng",
    price: 2000000,
    description: "Cổng hoa tươi theo tông màu của tiệc",
  },
  {
    id: "karaoke",
    name: "Karaoke di động",
    unit: "bộ",
    price: 1200000,
    description: "Loa kéo, hai micro, danh sách bài hát",
  },
  {
    id: "banhoa",
    name: "Hoa để bàn",
    unit: "bàn bố trí",
    price: 150000,
    description: "Bình hoa tươi cho mỗi bàn bố trí",
  },
];

export const EVENT_TYPES = [
  "Cưới hỏi",
  "Sinh nhật",
  "Giỗ",
  "Tất niên",
  "Tân gia",
  "Họp mặt",
];

export const FEATURED_DISH_IDS = ["tom", "bo", "lauthai", "xoi"];

export const dishById = (id: string) => DISHES.find((dish) => dish.id === id)!;
export const menuSetById = (id: string) =>
  MENU_SETS.find((set) => set.id === id)!;
export const serviceById = (id: string) =>
  SERVICES.find((service) => service.id === id)!;
export const dishImage = (id: string) => `/images/dishes/${id}.jpg`;

/** BR03 */
export const menuSetPrice = (set: MenuSet) =>
  set.dishIds.reduce((sum, id) => sum + dishById(id).price, 0);

export const menuSetDishNames = (set: MenuSet) =>
  set.dishIds.map((id) => dishById(id).name);
