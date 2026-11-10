"use client";

import { ClockIcon, PrintIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PAYMENT_PURPOSE, SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  CUSTOMER,
  MEAL_COMPANY as meal,
  SETTLEMENT_COMPANY as settlement,
} from "@/mocks/contracts";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import { PaymentCheckout } from "../payment/PaymentCheckout";

import { SettlementLines } from "./SettlementLines";

export function FinalInvoicePanel() {
  const status = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const balance = settlement.balance - settlementPaid;

  if (status === SETTLEMENT_STATUS.Draft) {
    return (
      <EmptyState>
        <ClockIcon size={26} />
        <p className="text-soft">
          Kế toán đang quyết toán bữa sau khi kiểm đếm dụng cụ. Khi hóa đơn sẵn
          sàng, bạn nhận thông báo ở trang tài khoản và thanh toán tại đây.
        </p>
      </EmptyState>
    );
  }

  return (
    <div className="l-grid l-grid-2">
      <section className="card l-stack">
        <div className="l-between">
          <div className="l-stack gap-0.5">
            <h3 className="card-title card-title-flush">
              Hóa đơn {settlement.invoiceNumber}
            </h3>
            <span className="text-small text-soft">
              {CUSTOMER.name} · {meal.name} · {meal.date}
            </span>
          </div>
          <StatusBadge domain="settlement" status={status} />
        </div>
        <SettlementLines settlementPaid={settlementPaid} />
        <div className="l-row no-print justify-end">
          <Button onClick={() => window.print()}>
            <PrintIcon size={18} />
            In hoặc lưu PDF
          </Button>
        </div>
      </section>

      {status === SETTLEMENT_STATUS.Invoiced && balance > 0 ? (
        <div className="no-print">
          <PaymentCheckout
            contractNumber={settlement.contractNumber}
            purpose={PAYMENT_PURPOSE.Settlement}
            referencePrefix={`QT-${settlement.contractNumber.slice(-4)}`}
            options={[
              {
                value: "balance",
                label: "Số dư theo hóa đơn quyết toán",
                amount: balance,
                hint: "Không trả góp, không ghi nợ. Thanh toán đủ để cơ sở đóng bữa.",
              },
            ]}
            onPaid={(paid) =>
              updateDemoState({
                settlementPaidAmount:
                  readDemoState().settlementPaidAmount + paid.amount,
                settlementStatus: SETTLEMENT_STATUS.Paid,
              })
            }
          />
        </div>
      ) : (
        <Alert tone="good" className="self-start">
          Bạn đã thanh toán đủ {formatMoney(settlement.settlementTotal)} cho bữa
          này. Cảm ơn bạn đã tin dùng MasterCook.
        </Alert>
      )}
    </div>
  );
}
