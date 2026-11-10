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

export type Assignment = {
  staff: string;
  position: string;
  task: string;
  hours: string;
};

export const STAFF_POSITIONS = ["Phục vụ", "Bếp", "Vận chuyển", "Kiểm đếm"];

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    staff: "Đỗ Minh Tâm",
    position: "Phục vụ",
    task: "Khu A",
    hours: "09:00–14:00",
  },
  {
    staff: "Vũ Thu Trang",
    position: "Phục vụ",
    task: "Khu B",
    hours: "09:00–14:00",
  },
];

export const MEAL_ASSIGNMENTS: Record<string, Assignment[]> = {
  "0120": DEFAULT_ASSIGNMENTS,
  "0115": [
    {
      staff: "Đỗ Minh Tâm",
      position: "Phục vụ",
      task: "Khu A",
      hours: "16:00–21:30",
    },
    {
      staff: "Nguyễn Văn Hùng",
      position: "Bếp",
      task: "Bếp chính",
      hours: "13:00–20:00",
    },
    {
      staff: "Lê Thị Hoa",
      position: "Bếp",
      task: "Sơ chế",
      hours: "13:00–20:00",
    },
    {
      staff: "Phạm Quốc Bảo",
      position: "Vận chuyển",
      task: "Chở dụng cụ",
      hours: "12:00–22:30",
    },
  ],
  "0128": DEFAULT_ASSIGNMENTS,
};
