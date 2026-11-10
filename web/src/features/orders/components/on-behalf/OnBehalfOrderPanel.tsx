import { PanelHeader } from "@/components/ui/PanelHeader";

import { CustomerLookupForm } from "./CustomerLookupForm";
import { OnBehalfMealForm } from "./OnBehalfMealForm";
import { OrderSummary } from "./OrderSummary";

export function OnBehalfOrderPanel() {
  return (
    <>
      <PanelHeader
        title="Đặt hộ khách"
        subtitle="Tìm hoặc tạo hồ sơ theo SĐT. Không tạo tài khoản cho khách."
      />
      <div className="l-grid l-grid-main">
        <div className="l-stack gap-4">
          <CustomerLookupForm />
          <OnBehalfMealForm />
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
