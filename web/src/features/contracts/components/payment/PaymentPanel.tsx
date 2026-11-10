"use client";

import { Suspense } from "react";

import { roundTo500 } from "@/lib/pricing";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";
import type { Contract } from "@/mocks/contracts";

import { AllocationPreview } from "./AllocationPreview";
import { DepositSlider } from "./DepositSlider";
import { PaymentStatusPoller } from "./PaymentStatusPoller";
import { QrPaymentCard } from "./QrPaymentCard";

export function PaymentPanel({ contract }: { contract: Contract }) {
  const percent = useDemoState((state) => state.depositPercent);
  const amount = roundTo500((contract.total * percent) / 100);

  return (
    <div className="l-grid l-grid-2">
      <section className="card l-stack">
        <h3 className="card-title card-title-flush">Chọn số tiền cọc</h3>
        <DepositSlider
          percent={percent}
          amount={amount}
          minimumDeposit={contract.total * 0.5}
          onChange={(depositPercent) => updateDemoState({ depositPercent })}
        />
        <AllocationPreview contract={contract} amount={amount} />
      </section>
      <section className="card l-stack items-center text-center">
        <QrPaymentCard percent={percent} />
        <Suspense fallback={null}>
          <PaymentStatusPoller />
        </Suspense>
      </section>
    </div>
  );
}
