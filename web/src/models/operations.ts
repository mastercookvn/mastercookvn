import type { MealStatus } from "@/constants/statuses";
import type { StaffPosition } from "@/constants/staffing";
import type { ServingWave } from "@/lib/servingWaves";

export type OperationMeal = {
  id: string;
  name: string;
  orderCode: string;
  /** dd/MM/yyyy */
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

export type Assignment = {
  staff: string;
  position: StaffPosition;
  task: string;
  hours: string;
};
