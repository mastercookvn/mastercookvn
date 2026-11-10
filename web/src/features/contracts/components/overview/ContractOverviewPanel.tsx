"use client";

import { Suspense } from "react";

import {
  MEAL_STATUS,
  SETTLEMENT_STATUS,
  type MealStatus,
} from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import { SETTLEMENT_COMPANY, type Contract } from "@/mocks/contracts";

import {
  isAwaitingContract,
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

import { ActivationChecklist } from "./ActivationChecklist";
import { ContractTerms } from "./ContractTerms";
import { ContractTotals } from "./ContractTotals";
import { MealSummaryCard } from "./MealSummaryCard";

export function ContractOverviewPanel({ contract }: { contract: Contract }) {
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const settlementClosed = useDemoState(
    (state) => state.settlementStatus === SETTLEMENT_STATUS.Closed
  );

  const awaiting = isAwaitingContract(contract);
  const active = awaiting && confirmed && deposited;
  const isSettlementContract =
    contract.number === SETTLEMENT_COMPANY.contractNumber;
  const paid = awaiting
    ? depositPaidAmount
    : isSettlementContract
      ? contract.paid + settlementPaid
      : contract.paid;
  const mealStatus = (status: MealStatus) =>
    active
      ? MEAL_STATUS.Confirmed
      : isSettlementContract && settlementClosed
        ? MEAL_STATUS.Completed
        : status;

  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack gap-4">
        {contract.meals.map((meal, index) => (
          <MealSummaryCard
            key={meal.name}
            meal={meal}
            index={index}
            status={mealStatus(meal.status)}
          />
        ))}
        <ContractTerms />
      </div>
      <aside className="l-stack sticky-side gap-4">
        <ContractTotals
          total={contract.total}
          paid={paid}
          deposit={
            awaiting
              ? {
                  label: MINIMUM_DEPOSIT_LABEL,
                  amount: minimumDeposit(contract),
                }
              : undefined
          }
        />
        {awaiting && !active ? (
          <Suspense fallback={null}>
            <ActivationChecklist />
          </Suspense>
        ) : null}
      </aside>
    </div>
  );
}
