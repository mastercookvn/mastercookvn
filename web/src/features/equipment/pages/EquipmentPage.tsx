import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { getStaffRoles } from "@/lib/auth";

import { EquipmentCatalogTable } from "../components/catalog/EquipmentCatalogTable";
import { DamagePanel } from "../components/damage/DamagePanel";
import { EquipmentPurchasesPanel } from "../components/purchase/EquipmentPurchasesPanel";
import { StockTable } from "../components/stock/StockTable";

export async function EquipmentPage() {
  const roles = await getStaffRoles();

  return (
    <WorkspaceTabs
      screen="equipment"
      panels={{
        stock: <StockTable />,
        purchase: <EquipmentPurchasesPanel />,
        damaged: <DamagePanel />,
        catalog: <EquipmentCatalogTable roles={roles} />,
      }}
    />
  );
}
