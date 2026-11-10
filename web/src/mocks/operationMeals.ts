import { MEAL_STATUS, type MealStatus } from "@/constants/statuses";

export type OperationMeal = {
  id: string;
  name: string;
  orderCode: string;
  date: string;
  time: string;
  address: string;
  servingTables: number;
  guests: number;
  setupTables: number;
  initialStatus: MealStatus;
};

export const OPERATION_MEALS: OperationMeal[] = [
  {
    id: "0120",
    name: "Tiệc họp mặt",
    orderCode: "DH-0120",
    date: "01/11",
    time: "17:00–20:00",
    address: "33 Hoa Lan, Phú Nhuận",
    servingTables: 9,
    guests: 90,
    setupTables: 9,
    initialStatus: MEAL_STATUS.AwaitingCount,
  },
  {
    id: "0115",
    name: "Họp mặt công ty",
    orderCode: "DH-0115",
    date: "15/11",
    time: "18:00–21:00",
    address: "18 Điện Biên Phủ, Bình Thạnh",
    servingTables: 20,
    guests: 200,
    setupTables: 9,
    initialStatus: MEAL_STATUS.Confirmed,
  },
  {
    id: "0128",
    name: "Tân gia",
    orderCode: "DH-0128",
    date: "22/11",
    time: "10:30–13:30",
    address: "57 Phan Xích Long, Phú Nhuận",
    servingTables: 12,
    guests: 120,
    setupTables: 6,
    initialStatus: MEAL_STATUS.Preparing,
  },
];

export const operationMealById = (id: string) =>
  OPERATION_MEALS.find((meal) => meal.id === id);
