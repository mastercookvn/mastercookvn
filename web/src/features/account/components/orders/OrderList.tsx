"use client";

import { useState } from "react";

import { SearchIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";

import {
  ORDER_GROUP,
  matchesOrder,
  useCustomerOrders,
  type OrderGroup,
} from "@/features/account/lib/useCustomerOrders";

import { CustomerNotices } from "./CustomerNotices";
import { OrderCard } from "./OrderCard";

const ALL = "all";

const FILTERS: { value: OrderGroup | typeof ALL; label: string }[] = [
  { value: ALL, label: "Tất cả" },
  { value: ORDER_GROUP.Open, label: "Đang xử lý" },
  { value: ORDER_GROUP.Done, label: "Đã hoàn tất" },
];

export function OrderList() {
  const orders = useCustomerOrders();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderGroup | typeof ALL>(ALL);

  const shown = orders.filter(
    (order) =>
      (filter === ALL || order.group === filter) && matchesOrder(order, query)
  );

  return (
    <>
      <CustomerNotices />
      <div className="order-lookup-bar">
        <label className="order-lookup-search">
          <SearchIcon size={16} />
          <input
            className="input"
            type="search"
            aria-label="Tra cứu đơn và hợp đồng"
            placeholder="Mã đơn, số hợp đồng, tên bữa hoặc ngày, ví dụ DH-0142"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div
          className="segmented"
          role="group"
          aria-label="Lọc theo trạng thái"
        >
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <EmptyState>
          <p className="text-soft">
            {query.trim()
              ? `Không có đơn nào khớp “${query.trim()}”.`
              : "Chưa có đơn nào trong mục này."}
          </p>
          <ButtonLink href={ROUTES.booking}>Đặt tiệc mới</ButtonLink>
        </EmptyState>
      ) : (
        <div className="l-stack">
          {shown.map((order) => (
            <OrderCard key={order.orderCode} order={order} />
          ))}
        </div>
      )}
    </>
  );
}
