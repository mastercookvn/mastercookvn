import type { ReactNode } from "react";

import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { AcceptanceRail } from "../components/acceptance/AcceptanceRail";
import { CapacityCheck } from "../components/capacity/CapacityCheck";
import { OrderHeader } from "../components/detail/OrderHeader";
import { OrderMealsPanel } from "../components/detail/OrderMealsPanel";
import { SiteSurveyForm } from "../components/survey/SiteSurveyForm";

const withRail = (panel: ReactNode) => (
  <div className="l-grid l-grid-decision">
    <div className="l-stack">{panel}</div>
    <AcceptanceRail />
  </div>
);

export function OrderDetailPage() {
  return (
    <WorkspaceTabs
      screen="orderDetail"
      showTitle={false}
      headerGap="gap-3.5"
      header={<OrderHeader />}
      panels={{
        meals: withRail(<OrderMealsPanel />),
        survey: withRail(<SiteSurveyForm />),
        capacity: withRail(<CapacityCheck />),
      }}
    />
  );
}
