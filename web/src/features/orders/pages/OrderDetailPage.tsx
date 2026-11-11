import type { ReactNode } from "react";

import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { AcceptanceRail } from "../components/acceptance/AcceptanceRail";
import { CapacityCheck } from "../components/capacity/CapacityCheck";
import { OrderHeader } from "../components/detail/OrderHeader";
import { OrderMealsPanel } from "../components/detail/OrderMealsPanel";
import { SiteSurveyForm } from "../components/survey/SiteSurveyForm";

export function OrderDetailPage({ code }: { code: string }) {
  const withRail = (panel: ReactNode) => (
    <div className="l-grid l-grid-decision">
      <div className="l-stack">{panel}</div>
      <AcceptanceRail code={code} />
    </div>
  );

  return (
    <WorkspaceTabs
      screen="orderDetail"
      showTitle={false}
      headerGap="gap-3.5"
      header={<OrderHeader code={code} />}
      panels={{
        meals: withRail(<OrderMealsPanel code={code} />),
        survey: withRail(<SiteSurveyForm code={code} />),
        capacity: withRail(<CapacityCheck code={code} />),
      }}
    />
  );
}
