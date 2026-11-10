"use client";

import { useState } from "react";

import { ORDER_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import { ORDERS } from "@/mocks/orders";

import { OrderDateFilter } from "./OrderDateFilter";
import { OrderStatusSegments, type OrderFilter } from "./OrderStatusSegments";
import { OrderTable } from "./OrderTable";

const FILTERS: OrderFilter[] = [
  "ALL",
  ORDER_STATUS.Pending,
  ORDER_STATUS.Accepted,
  ORDER_STATUS.Rejected,
];

export function OrderListPanel() {
  const firstStatus = useDemoState((state) => state.orderStatus);
  const [filter, setFilter] = useState<OrderFilter>("ALL");

  const orders = ORDERS.map((order) =>
    order.code === "DH-0142" ? { ...order, status: firstStatus } : order,
  );
  const counts = Object.fromEntries(
    FILTERS.map((option) => [
      option,
      option === "ALL"
        ? orders.length
        : orders.filter((order) => order.status === option).length,
    ]),
  );

  return (
    <>
      <div className="l-between">
        <OrderStatusSegments
          options={FILTERS}
          active={filter}
          counts={counts}
          onChange={setFilter}
        />
        <OrderDateFilter />
      </div>
      <OrderTable
        orders={
          filter === "ALL"
            ? orders
            : orders.filter((order) => order.status === filter)
        }
      />
    </>
  );
}
