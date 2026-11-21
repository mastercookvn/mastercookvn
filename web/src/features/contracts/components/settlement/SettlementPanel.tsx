"use client";

import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useDemoState } from "@/lib/demoStore";
import type { Contract } from "@/models/contracts";

import { buildSettlement } from "../../lib/settlement";
import { CompensationList } from "./CompensationList";
import { MealTransactions } from "./MealTransactions";
import { SettlementSheet } from "./SettlementSheet";

export function SettlementPanel({ contract }: { contract: Contract }) {
  const status = useDemoState((state) => state.settlementStatus);
  const settlement = buildSettlement(contract);

  return (
    <>
      <PanelHeader
        title="Quyết toán bữa"
        actions={<StatusBadge domain="settlement" status={status} />}
      />
      <div className="l-grid l-grid-main">
        <SettlementSheet settlement={settlement} />
        <aside className="card l-stack">
          <h3 className="card-title card-title-flush">Giao dịch của bữa</h3>
          <MealTransactions depositPaid={settlement.paid} />
          <CompensationList lines={settlement.compensationLines} />
        </aside>
      </div>
    </>
  );
}
