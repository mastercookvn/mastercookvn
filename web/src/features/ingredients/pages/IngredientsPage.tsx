import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { IngredientTable } from "../components/catalog/IngredientTable";
import { ClosingPanel } from "../components/closing/ClosingPanel";
import { PricingPanel } from "../components/pricing/PricingPanel";
import { PurchaseForm } from "../components/purchases/PurchaseForm";
import { StocktakeTable } from "../components/stocktake/StocktakeTable";

export function IngredientsPage() {
  return (
    <WorkspaceTabs
      screen="ingredients"
      panels={{
        purchases: <PurchaseForm />,
        stocktake: <StocktakeTable />,
        closing: <ClosingPanel />,
        pricing: <PricingPanel />,
        catalog: <IngredientTable />,
      }}
    />
  );
}
