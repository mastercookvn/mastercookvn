"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Drawer, DRAWER_SIZE } from "@/components/ui/Drawer";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ORDER_STATUS_META } from "@/constants/labels";
import { ORDER_STATUS } from "@/constants/statuses";
import { useWorkspaceOrders } from "@/features/orders/lib/useOrders";

import { OnBehalfOrderForm } from "../on-behalf/OnBehalfOrderForm";

import { OrderDateFilter } from "./OrderDateFilter";
import { OrderStatusSegments, type OrderFilter } from "./OrderStatusSegments";
import { OrderTable } from "./OrderTable";

const FILTERS: OrderFilter[] = [
  "ALL",
  ORDER_STATUS.Pending,
  ORDER_STATUS.Accepted,
  ORDER_STATUS.Rejected,
];

const FORM_ID = "on-behalf-order-form";

export function OrderListPanel({ canCreate }: { canCreate: boolean }) {
  const [filter, setFilter] = useState<OrderFilter>("ALL");
  const [adding, setAdding] = useState(false);

  const orders = useWorkspaceOrders();
  const counts = Object.fromEntries(
    FILTERS.map((option) => [
      option,
      option === "ALL"
        ? orders.length
        : orders.filter((order) => order.status === option).length,
    ])
  );

  return (
    <>
      <PanelHeader
        title="Tất cả đơn"
        count={orders.length}
        actions={
          <>
            <ExportButton
              fileName="don-dat-tiec"
              columns={[
                "Mã đơn",
                "Khách",
                "SĐT",
                "Số bữa",
                "Ngày tiệc đầu",
                "Kênh",
                "Tổng (đ)",
                "Trạng thái",
              ]}
              rows={orders.map((order) => [
                order.code,
                order.customer,
                order.phone,
                order.meals,
                order.firstDate,
                order.channel,
                order.total,
                ORDER_STATUS_META[order.status].label,
              ])}
            />
            {canCreate ? (
              <AddButton onClick={() => setAdding(true)}>
                Tạo đơn đặt hộ
              </AddButton>
            ) : null}
          </>
        }
      />
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
      <Drawer
        open={adding}
        onOpenChange={setAdding}
        title="Tạo đơn đặt hộ khách"
        size={DRAWER_SIZE.Large}
        formId={FORM_ID}
        submitLabel="Tạo đơn"
      >
        {adding ? (
          <OnBehalfOrderForm
            formId={FORM_ID}
            onSaved={() => setAdding(false)}
          />
        ) : null}
      </Drawer>
    </>
  );
}
