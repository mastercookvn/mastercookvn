"use client";

import Link from "next/link";

import { StarIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { ROUTES } from "@/constants/routes";
import { CONTRACT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_BIRTHDAY,
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
} from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import { DeadlineAlert } from "./DeadlineAlert";
import { OrderCard } from "./OrderCard";

export function OrderList() {
  const weddingActive = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed,
  );
  const reviewed = useDemoState((state) => state.reviewSubmitted);

  return (
    <>
      <DeadlineAlert />
      <div className="l-stack">
        <OrderCard
          orderCode={CONTRACT_WEDDING.orderCode}
          contractNumber={CONTRACT_WEDDING.number}
          status={
            weddingActive ? CONTRACT_STATUS.Active : CONTRACT_WEDDING.status
          }
          summary="2 bữa · 14/12/2026 và 20/12/2026 · Cưới hỏi"
          total={CONTRACT_WEDDING.total}
          accent="var(--color-gold)"
          actions={
            <Link
              href={ROUTES.contract(CONTRACT_WEDDING.number)}
              className={buttonVariants({ variant: "primary" })}
            >
              Xem và xác nhận
            </Link>
          }
        />
        <OrderCard
          orderCode={CONTRACT_HOUSEWARMING.orderCode}
          contractNumber={CONTRACT_HOUSEWARMING.number}
          status={CONTRACT_HOUSEWARMING.status}
          summary={`1 bữa · 22/11/2026 · Tân gia · Đã thu ${formatMoney(CONTRACT_HOUSEWARMING.paid)}`}
          total={CONTRACT_HOUSEWARMING.total}
          accent="var(--color-good)"
          actions={
            <Link
              href={ROUTES.contract(CONTRACT_HOUSEWARMING.number)}
              className={buttonVariants()}
            >
              Xem hợp đồng
            </Link>
          }
        />
        <OrderCard
          orderCode={CONTRACT_BIRTHDAY.orderCode}
          contractNumber={CONTRACT_BIRTHDAY.number}
          status={CONTRACT_BIRTHDAY.status}
          summary="1 bữa · 18/10/2026 · Sinh nhật · Đã hoàn tất"
          total={CONTRACT_BIRTHDAY.total}
          accent="var(--color-line-strong)"
          actions={
            reviewed ? (
              <Badge tone="good">Đã đánh giá</Badge>
            ) : (
              <Link
                href={`${ROUTES.contract(CONTRACT_BIRTHDAY.number)}?tab=review`}
                className={buttonVariants()}
              >
                <StarIcon size={18} />
                Đánh giá
              </Link>
            )
          }
        />
      </div>
    </>
  );
}
