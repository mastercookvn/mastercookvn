import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { IngredientTable } from "../components/catalog/IngredientTable";
import { ClosingPanel } from "../components/closing/ClosingPanel";
import { PricingPanel } from "../components/pricing/PricingPanel";
import { PurchasesPanel } from "../components/purchases/PurchasesPanel";
import { StocktakeTable } from "../components/stocktake/StocktakeTable";

export function IngredientsPage() {
  return (
    <WorkspaceTabs
      screen="ingredients"
      panels={{
        purchases: <PurchasesPanel />,
        stocktake: <StocktakeTable />,
        closing: <ClosingPanel />,
        pricing: <PricingPanel />,
        catalog: <IngredientTable />,
      }}
    />
  );
}
