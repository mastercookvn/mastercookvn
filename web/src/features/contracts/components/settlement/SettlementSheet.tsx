"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useToast } from "@/components/ui/Toast";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  MEAL_COMPANY as meal,
  SETTLEMENT_COMPANY as settlement,
} from "@/mocks/contracts";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

import { SettlementLines } from "./SettlementLines";

export function SettlementSheet() {
  const status = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const showToast = useToast();
  const balance = settlement.balance - settlementPaid;

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">
        {settlement.orderCode} · {meal.name} · {meal.date}
      </h3>
      <SettlementLines settlementPaid={settlementPaid} />

      {status === SETTLEMENT_STATUS.Draft ? (
        <>
          <Alert tone="info">
            Kiểm tra giá trị bữa và bồi thường rồi phát hành hóa đơn. Khách nhận
            thông báo trong tài khoản và thanh toán số dư bằng QR.
          </Alert>
          <div className="l-row justify-end">
            <Button
              variant="primary"
              onClick={() => {
                updateDemoState({
                  settlementStatus: SETTLEMENT_STATUS.Invoiced,
                });
                showToast(
                  `Đã phát hành hóa đơn ${settlement.invoiceNumber}. Khách nhận thông báo cần thanh toán ${formatMoney(balance)}.`
                );
              }}
            >
              Phát hành hóa đơn cho khách
            </Button>
          </div>
        </>
      ) : null}

      {status === SETTLEMENT_STATUS.Invoiced ? (
        <>
          <Alert tone="wait">
            Đã gửi hóa đơn {settlement.invoiceNumber}. Chờ khách thanh toán{" "}
            {formatMoney(balance)}. Khách trả tiền mặt thì ghi ở tab Thu tiền.
          </Alert>
          <div className="l-row justify-end">
            <ButtonLink href="?tab=payment">Ghi thu tiền mặt</ButtonLink>
            <Button variant="primary" disabled title="Số dư phải bằng 0">
              Xác nhận hoàn tất bữa
            </Button>
          </div>
        </>
      ) : null}

      {status === SETTLEMENT_STATUS.Paid ? (
        <>
          <Alert tone="good">Khách đã thanh toán đủ. Số dư bằng 0.</Alert>
          <div className="l-row justify-end">
            <Button
              variant="primary"
              onClick={() => {
                updateDemoState({ settlementStatus: SETTLEMENT_STATUS.Closed });
                showToast("Đã đóng bữa. Khách có thể gửi đánh giá.");
              }}
            >
              Xác nhận hoàn tất bữa
            </Button>
          </div>
        </>
      ) : null}

      {status === SETTLEMENT_STATUS.Closed ? (
        <Alert tone="good">Bữa đã hoàn tất và đóng quyết toán.</Alert>
      ) : null}
    </section>
  );
}
