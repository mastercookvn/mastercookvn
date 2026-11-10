import { BUSINESS_SETTINGS } from "@/constants/settings";
import { ORDER_STATUS, type OrderStatus } from "@/constants/statuses";
import { calculateMealPrice } from "@/lib/pricing";

import { MENU_SETS, menuSetPrice, serviceById } from "./catalog";
import {
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
  CUSTOMER,
  MEAL_COMPANY,
} from "./contracts";

const onBehalfPrice = calculateMealPrice({
  dishesTotal: menuSetPrice(MENU_SETS[0]),
  servingTables: 8,
  guestsPerTable: 10,
  services: [{ price: serviceById("don").price, quantity: 1 }],
});

export const ON_BEHALF_PRICE = onBehalfPrice;

export type OrderRow = {
  code: string;
  customer: string;
  phone: string;
  meals: number;
  firstDate: string;
  channel: string;
  total: number;
  status: OrderStatus;
};

export const ORDERS: OrderRow[] = [
  {
    code: "DH-0142",
    customer: CUSTOMER.name,
    phone: CUSTOMER.phone,
    meals: 2,
    firstDate: "14/12/2026",
    channel: "Online",
    total: CONTRACT_WEDDING.total,
    status: ORDER_STATUS.Pending,
  },
  {
    code: "DH-0151",
    customer: "Nguyễn Minh Đức",
    phone: "0978 222 333",
    meals: 1,
    firstDate: "28/11/2026",
    channel: "Đặt hộ",
    total: onBehalfPrice.total,
    status: ORDER_STATUS.Pending,
  },
  {
    code: "DH-0128",
    customer: "Lý Hoàng Nam",
    phone: "0935 444 555",
    meals: 1,
    firstDate: "22/11/2026",
    channel: "Online",
    total: CONTRACT_HOUSEWARMING.total,
    status: ORDER_STATUS.Accepted,
  },
  {
    code: "DH-0097",
    customer: "Công ty Minh Long",
    phone: "0283 666 777",
    meals: 1,
    firstDate: "25/10/2026",
    channel: "Đặt hộ",
    total: MEAL_COMPANY.price.total,
    status: ORDER_STATUS.Accepted,
  },
  {
    code: "DH-0090",
    customer: "Phan Thị Yến",
    phone: "0909 888 999",
    meals: 1,
    firstDate: "10/10/2026",
    channel: "Online",
    total: 15400000,
    status: ORDER_STATUS.Rejected,
  },
];

export const SURVEY_QUESTIONS = [
  ["Nguồn điện tại địa điểm", "Có ổ 220V, cần kéo dây 30 m"],
  ["Nguồn nước", "Có vòi nước sau nhà"],
  ["Khu vực chia món", "Sân sau 20 m², thoáng"],
  ["Tầng, thang máy", "Tầng trệt"],
  ["Xe tải tiếp cận", "Hẻm 4 m, xe 1,5 tấn vào được"],
  ["Diện tích đặt bàn", "120 m², đủ 10 bàn tròn"],
];

export const SERVICE_RADIUS_KM = BUSINESS_SETTINGS.serviceRadiusKm;
