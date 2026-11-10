import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { getStaffRoles } from "@/lib/auth";

import { EquipmentCatalogTable } from "../components/catalog/EquipmentCatalogTable";
import { DamageHandlingForm } from "../components/damage/DamageHandlingForm";
import { EquipmentPurchaseForm } from "../components/purchase/EquipmentPurchaseForm";
import { StockTable } from "../components/stock/StockTable";

export async function EquipmentPage() {
  const roles = await getStaffRoles();

  return (
    <WorkspaceTabs
      screen="equipment"
      panels={{
        stock: <StockTable />,
        purchase: <EquipmentPurchaseForm />,
        damaged: <DamageHandlingForm />,
        catalog: <EquipmentCatalogTable roles={roles} />,
      }}
    />
  );
}
