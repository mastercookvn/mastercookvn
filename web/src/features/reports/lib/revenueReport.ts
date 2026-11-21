export type MonthlyRevenue = {
  /** mm/yyyy */
  month: string;
  dishRevenue: number;
  foodCost: number;
};

export type RevenueReport = {
  period: string;
  months: MonthlyRevenue[];
  dishRevenue: number;
  foodCost: number;
  margin: number;
  averageRating: number | null;
  cashFlow: {
    received: number;
    refunded: number;
    retained: number;
    compensation: number;
  };
  orderStats: {
    completed: number;
    inProgress: number;
    cancelled: number;
  };
};
