import { ServiceCardGrid } from "../components/catalog/ServiceCardGrid";
import { ChangePolicyCard } from "../components/policies/ChangePolicyCard";
import { DepositPolicyCard } from "../components/policies/DepositPolicyCard";
import { EquipmentPolicyCard } from "../components/policies/EquipmentPolicyCard";
import { RefundPolicyTable } from "../components/policies/RefundPolicyTable";
import { TableTermsNote } from "../components/policies/TableTermsNote";
import { ServicesHeader } from "../components/ServicesHeader";

export function ServicesPage() {
  return (
    <div className="page">
      <ServicesHeader />
      <ServiceCardGrid />
      <TableTermsNote />
      <div className="l-grid l-grid-2">
        <DepositPolicyCard />
        <ChangePolicyCard />
      </div>
      <div className="l-grid l-grid-main">
        <RefundPolicyTable />
        <EquipmentPolicyCard />
      </div>
    </div>
  );
}
