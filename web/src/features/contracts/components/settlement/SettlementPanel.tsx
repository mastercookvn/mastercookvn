"use client";

import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useDemoState } from "@/mocks/demoStore";

import { CompensationList } from "./CompensationList";
import { MealTransactions } from "./MealTransactions";
import { SettlementSheet } from "./SettlementSheet";

export function SettlementPanel() {
  const status = useDemoState((state) => state.settlementStatus);

  return (
    <>
      <PanelHeader
        title="Quyết toán bữa"
        subtitle="Đối trừ đúng một lần. Không ghi công nợ trả chậm."
        actions={<StatusBadge domain="settlement" status={status} />}
      />
      <div className="l-grid l-grid-main">
        <SettlementSheet />
        <aside className="card l-stack">
          <h3 className="card-title card-title-flush">Giao dịch của bữa</h3>
          <MealTransactions />
          <CompensationList />
        </aside>
      </div>
    </>
  );
}
