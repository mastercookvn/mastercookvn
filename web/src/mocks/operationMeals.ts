import { MEAL_STATUS, type MealStatus } from "@/constants/statuses";
import { waveSpan, waveTotals, type ServingWave } from "@/lib/servingWaves";

export type OperationMeal = {
  id: string;
  name: string;
  orderCode: string;
  date: string;
  time: string;
  address: string;
  guestsPerTable: number;
  waves: ServingWave[];
  servingTables: number;
  guests: number;
  setupTables: number;
  initialStatus: MealStatus;
};

type OperationMealInput = Omit<
  OperationMeal,
  "time" | "servingTables" | "guests" | "setupTables"
>;

function createOperationMeal(input: OperationMealInput): OperationMeal {
  const totals = waveTotals(input.waves);
  return {
    ...input,
    ...totals,
    time: waveSpan(input.waves),
    guests: totals.servingTables * input.guestsPerTable,
  };
}

export const OPERATION_MEALS: OperationMeal[] = [
  createOperationMeal({
    id: "0120",
    name: "Tiệc họp mặt",
    orderCode: "DH-0120",
    date: "01/11",
    address: "33 Hoa Lan, Phú Nhuận",
    guestsPerTable: 10,
    waves: [{ from: "17:00", to: "20:00", tables: 9 }],
    initialStatus: MEAL_STATUS.AwaitingCount,
  }),
  createOperationMeal({
    id: "0115",
    name: "Họp mặt công ty",
    orderCode: "DH-0115",
    date: "15/11",
    address: "18 Điện Biên Phủ, Bình Thạnh",
    guestsPerTable: 10,
    waves: [
      { from: "18:00", to: "19:00", tables: 7 },
      { from: "19:00", to: "20:00", tables: 7 },
      { from: "20:00", to: "21:00", tables: 6 },
    ],
    initialStatus: MEAL_STATUS.Confirmed,
  }),
  createOperationMeal({
    id: "0128",
    name: "Tân gia",
    orderCode: "DH-0128",
    date: "22/11",
    address: "57 Phan Xích Long, Phú Nhuận",
    guestsPerTable: 10,
    waves: [
      { from: "10:30", to: "12:00", tables: 6 },
      { from: "12:00", to: "13:30", tables: 6 },
    ],
    initialStatus: MEAL_STATUS.Preparing,
  }),
];

export const operationMealById = (id: string) =>
  OPERATION_MEALS.find((meal) => meal.id === id);

export type Assignment = {
  staff: string;
  position: string;
  task: string;
  hours: string;
};

export { STAFF_POSITIONS } from "@/constants/staffing";

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
