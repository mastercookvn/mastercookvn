import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ADDENDUM_STATUS } from "@/constants/statuses";
import {
  CONTRACT_HOUSEWARMING,
  daysUntil,
  MEAL_HOUSEWARMING as meal,
} from "@/mocks/contracts";

import { AddendumChangeCard } from "./AddendumChangeCard";
import { AddendumComparisonCard } from "./AddendumComparisonCard";

export function AddendumDraftPanel() {
  return (
    <>
      <PanelHeader
        title="Lập phụ lục"
        subtitle={`${CONTRACT_HOUSEWARMING.number} · Bữa ${meal.date} · Còn ${daysUntil(meal.startsAt)} ngày`}
        actions={
          <StatusBadge domain="addendum" status={ADDENDUM_STATUS.Pending} />
        }
      />
      <div className="l-grid l-grid-2">
        <AddendumChangeCard />
        <AddendumComparisonCard />
      </div>
    </>
  );
}
