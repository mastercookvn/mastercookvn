"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { StarIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { ROUTES } from "@/constants/routes";
import {
  CONTRACT_STATUS,
  ORDER_STATUS,
  SETTLEMENT_STATUS,
} from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { type Contract } from "@/models/contracts";
import { useDemoState } from "@/lib/demoStore";
import { mealTitle } from "@/features/booking/lib/mealTitle";
import { listContracts } from "@/features/contracts/lib/contractRepository";
import {
  isAwaitingContract,
  isAwaitingSettlement,
} from "@/features/contracts/lib/contractState";
import { buildSettlement } from "@/features/contracts/lib/settlement";

export const ORDER_GROUP = {
  Open: "open",
  Done: "done",
} as const;

export type OrderGroup = (typeof ORDER_GROUP)[keyof typeof ORDER_GROUP];

export type CustomerOrder = {
  orderCode: string;
  contractNumber: string | null;
  /** Phone the order was placed with. */
  phone: string;
  eventType: string;
  mealNames: string[];
  dates: string[];
  total: number;
  group: OrderGroup;
  badge: ReactNode;
  note?: string;
  accent: string;
  actions: ReactNode;
};

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

/** Matches a code, a meal name, an event type or a date the customer remembers. */
export function matchesOrder(order: CustomerOrder, query: string) {
  const needle = normalize(query.trim()).replaceAll(" ", "");
  if (needle === "") return true;
  return normalize(
    [
      order.orderCode,
      order.contractNumber ?? "",
      order.eventType,
      ...order.mealNames,
      ...order.dates,
    ].join("|")
  )
    .replaceAll(" ", "")
    .includes(needle);
}

const fromContract = (contract: Contract) => ({
  orderCode: contract.orderCode,
  contractNumber: contract.number,
  phone: contract.customerPhone,
  eventType: contract.meals[0]?.eventType ?? "",
  mealNames: contract.meals.map((meal) => meal.name),
  dates: contract.meals.map((meal) => meal.date),
});

const SETTLEMENT_NOTE = {
  [SETTLEMENT_STATUS.Draft]: "Đang chờ kế toán quyết toán",
  [SETTLEMENT_STATUS.Invoiced]: "Có hóa đơn quyết toán cần thanh toán",
  [SETTLEMENT_STATUS.Paid]: "Đã thanh toán đủ, chờ cơ sở đóng bữa",
  [SETTLEMENT_STATUS.Closed]: "Đã hoàn tất",
};

export function useCustomerOrders(): CustomerOrder[] {
  const reviewed = useDemoState((state) => state.reviewSubmitted);
  const settlementStatus = useDemoState((state) => state.settlementStatus);
  const submitted = useDemoState((state) => state.submittedOrders);
  const orderStatuses = useDemoState((state) => state.orderStatuses);

  const contractOrder = (contract: Contract): CustomerOrder => {
    const base = { ...fromContract(contract), total: contract.total };
    const badge = <StatusBadge domain="contract" status={contract.status} />;
    const href = ROUTES.contract(contract.number);

    if (isAwaitingContract(contract)) {
      return {
        ...base,
        group: ORDER_GROUP.Open,
        badge,
        accent: "var(--color-gold)",
        actions: (
          <Link href={href} className={buttonVariants({ variant: "primary" })}>
            Xem và xác nhận
          </Link>
        ),
      };
    }

    if (isAwaitingSettlement(contract)) {
      const invoiced = settlementStatus === SETTLEMENT_STATUS.Invoiced;
      return {
        ...base,
        total: buildSettlement(contract).settlementTotal,
        group: ORDER_GROUP.Open,
        badge,
        note: SETTLEMENT_NOTE[settlementStatus],
        accent: invoiced ? "var(--color-info)" : "var(--color-line-strong)",
        actions: (
          <Link
            href={`${href}?tab=invoice`}
            className={buttonVariants({
              variant: invoiced ? "primary" : "default",
            })}
          >
            {invoiced ? "Thanh toán hóa đơn" : "Xem hóa đơn"}
          </Link>
        ),
      };
    }

    if (contract.status === CONTRACT_STATUS.Completed) {
      return {
        ...base,
        group: ORDER_GROUP.Done,
        badge,
        accent: "var(--color-line-strong)",
        actions: reviewed ? (
          <Badge tone="good">Đã đánh giá</Badge>
        ) : (
          <Link href={`${href}?tab=review`} className={buttonVariants()}>
            <StarIcon size={18} />
            Đánh giá
          </Link>
        ),
      };
    }

    return {
      ...base,
      group: ORDER_GROUP.Open,
      badge,
      note: `Đã thu ${formatMoney(contract.paid)}`,
      accent: "var(--color-good)",
      actions: (
        <Link href={href} className={buttonVariants()}>
          Xem hợp đồng
        </Link>
      ),
    };
  };

  return [
    ...submitted.map((order): CustomerOrder => ({
      orderCode: order.code,
      contractNumber: null,
      phone: order.contact?.phone ?? "",
      eventType: order.eventType,
      mealNames: order.meals.map((meal, index) =>
        mealTitle(meal, `Bữa ${index + 1}`)
      ),
      dates: order.meals.map((meal) => meal.date),
      total: order.total,
      group: ORDER_GROUP.Open,
      badge: (
        <StatusBadge
          domain="order"
          status={orderStatuses[order.code] ?? ORDER_STATUS.Pending}
        />
      ),
      note:
        orderStatuses[order.code] === ORDER_STATUS.Rejected
          ? `Gửi ngày ${order.submittedAt} · Cơ sở không nhận được đơn này`
          : orderStatuses[order.code] === ORDER_STATUS.Accepted
            ? `Gửi ngày ${order.submittedAt} · Đã nhận, chờ cơ sở phát hành hợp đồng`
            : `Gửi ngày ${order.submittedAt} · Tư vấn sẽ gọi khảo sát rồi lập hợp đồng`,
      accent: "var(--color-wait)",
      actions: null,
    })),
    ...listContracts().map(contractOrder),
  ];
}
