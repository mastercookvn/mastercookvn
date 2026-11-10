"use client";

import { Suspense } from "react";

import { MEAL_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import type { Contract } from "@/mocks/contracts";

import { isAwaitingContract } from "@/features/contracts/lib/contractState";

import { ActivationChecklist } from "./ActivationChecklist";
import { ContractTerms } from "./ContractTerms";
import { ContractTotals } from "./ContractTotals";
import { MealSummaryCard } from "./MealSummaryCard";

export function ContractOverviewPanel({ contract }: { contract: Contract }) {
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);
  const depositPercent = useDemoState((state) => state.depositPercent);

  const awaiting = isAwaitingContract(contract);
  const active = awaiting && confirmed && deposited;
  const paid = awaiting
    ? deposited
      ? (contract.total * depositPercent) / 100
      : 0
    : contract.paid;

  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack gap-4">
        {contract.meals.map((meal, index) => (
          <MealSummaryCard
            key={meal.name}
            meal={meal}
            index={index}
            status={active ? MEAL_STATUS.Confirmed : meal.status}
          />
        ))}
        <ContractTerms />
      </div>
      <aside className="l-stack sticky-side gap-4">
        <ContractTotals total={contract.total} paid={paid} />
        {awaiting && !active ? (
          <Suspense fallback={null}>
            <ActivationChecklist />
          </Suspense>
        ) : null}
      </aside>
    </div>
  );
}
