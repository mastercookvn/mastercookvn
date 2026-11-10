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
import {
  CONTRACT_BIRTHDAY,
  CONTRACT_COMPANY,
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
  SETTLEMENT_COMPANY,
  type Contract,
} from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export const ORDER_GROUP = {
  Open: "open",
  Done: "done",
} as const;

export type OrderGroup = (typeof ORDER_GROUP)[keyof typeof ORDER_GROUP];

export type CustomerOrder = {
  orderCode: string;
  contractNumber: string | null;
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
  eventType: contract.meals[0].eventType,
  mealNames: contract.meals.map((meal) => meal.name),
  dates: contract.meals.map((meal) => meal.date),
});

export function useCustomerOrders(): CustomerOrder[] {
  const weddingActive = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed
  );
  const reviewed = useDemoState((state) => state.reviewSubmitted);
  const settlementStatus = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const submitted = useDemoState((state) => state.submittedOrders);

  const companyNote = {
    [SETTLEMENT_STATUS.Draft]: "Đang chờ kế toán quyết toán",
    [SETTLEMENT_STATUS.Invoiced]: `Có hóa đơn quyết toán, cần trả ${formatMoney(SETTLEMENT_COMPANY.balance - settlementPaid)}`,
    [SETTLEMENT_STATUS.Paid]: "Đã thanh toán đủ, chờ cơ sở đóng bữa",
    [SETTLEMENT_STATUS.Closed]: "Đã hoàn tất",
  }[settlementStatus];
  const companyClosed = settlementStatus === SETTLEMENT_STATUS.Closed;
  const companyInvoiced = settlementStatus === SETTLEMENT_STATUS.Invoiced;

  return [
    ...submitted.map((order): CustomerOrder => ({
      orderCode: order.code,
      contractNumber: null,
      eventType: order.eventType,
      mealNames: order.meals.map(
        (meal, index) => meal.name.trim() || `Bữa ${index + 1}`
      ),
      dates: order.meals.map((meal) => meal.date),
      total: order.total,
      group: ORDER_GROUP.Open,
      badge: <StatusBadge domain="order" status={ORDER_STATUS.Pending} />,
      note: `Gửi ngày ${order.submittedAt} · Tư vấn sẽ gọi khảo sát rồi lập hợp đồng`,
      accent: "var(--color-wait)",
      actions: null,
    })),
    {
      ...fromContract(CONTRACT_WEDDING),
      total: CONTRACT_WEDDING.total,
      group: ORDER_GROUP.Open,
      badge: (
        <StatusBadge
          domain="contract"
          status={
            weddingActive ? CONTRACT_STATUS.Active : CONTRACT_WEDDING.status
          }
        />
      ),
      accent: "var(--color-gold)",
      actions: (
        <Link
          href={ROUTES.contract(CONTRACT_WEDDING.number)}
          className={buttonVariants({
            variant: weddingActive ? "default" : "primary",
          })}
        >
          {weddingActive ? "Xem hợp đồng" : "Xem và xác nhận"}
        </Link>
      ),
    },
    {
      ...fromContract(CONTRACT_COMPANY),
      total: SETTLEMENT_COMPANY.settlementTotal,
      group: companyClosed ? ORDER_GROUP.Done : ORDER_GROUP.Open,
      badge: (
        <StatusBadge
          domain="contract"
          status={
            companyClosed ? CONTRACT_STATUS.Completed : CONTRACT_COMPANY.status
          }
        />
      ),
      note: companyNote,
      accent: companyInvoiced
        ? "var(--color-info)"
        : "var(--color-line-strong)",
      actions: (
        <Link
          href={`${ROUTES.contract(CONTRACT_COMPANY.number)}?tab=invoice`}
          className={buttonVariants({
            variant: companyInvoiced ? "primary" : "default",
          })}
        >
          {companyInvoiced ? "Thanh toán hóa đơn" : "Xem hóa đơn"}
        </Link>
      ),
    },
    {
      ...fromContract(CONTRACT_HOUSEWARMING),
      total: CONTRACT_HOUSEWARMING.total,
      group: ORDER_GROUP.Open,
      badge: (
        <StatusBadge domain="contract" status={CONTRACT_HOUSEWARMING.status} />
      ),
      note: `Đã thu ${formatMoney(CONTRACT_HOUSEWARMING.paid)}`,
      accent: "var(--color-good)",
      actions: (
        <Link
          href={ROUTES.contract(CONTRACT_HOUSEWARMING.number)}
          className={buttonVariants()}
        >
          Xem hợp đồng
        </Link>
      ),
    },
    {
      ...fromContract(CONTRACT_BIRTHDAY),
      total: CONTRACT_BIRTHDAY.total,
      group: ORDER_GROUP.Done,
      badge: (
        <StatusBadge domain="contract" status={CONTRACT_BIRTHDAY.status} />
      ),
      accent: "var(--color-line-strong)",
      actions: reviewed ? (
        <Badge tone="good">Đã đánh giá</Badge>
      ) : (
        <Link
          href={`${ROUTES.contract(CONTRACT_BIRTHDAY.number)}?tab=review`}
          className={buttonVariants()}
        >
          <StarIcon size={18} />
          Đánh giá
        </Link>
      ),
    },
  ];
}
