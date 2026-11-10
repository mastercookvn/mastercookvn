"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Drawer, DRAWER_SIZE } from "@/components/ui/Drawer";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { useDemoState } from "@/mocks/demoStore";

import { PurchaseForm } from "./PurchaseForm";
import { SavedPurchasesTable } from "./SavedPurchasesTable";

const FORM_ID = "ingredient-purchase-form";

export function PurchasesPanel() {
  const purchases = useDemoState((state) => state.purchases);
  const ingredients = useDemoState((state) => state.ingredients);
  const [adding, setAdding] = useState(false);
  const unitOf = (name: string) =>
    ingredients.find((ingredient) => ingredient.name === name)?.unit ?? "";

  return (
    <>
      <PanelHeader
        title="Phiếu nhập nguyên liệu"
        count={purchases.length}
        subtitle="Không gắn với bữa tiệc. Tháng đã chốt không ghi được."
        actions={
          <>
            <ExportButton
              fileName="phieu-nhap-nguyen-lieu"
              columns={[
                "Mã phiếu",
                "Ngày nhập",
                "Nhà cung cấp",
                "SĐT",
                "Nguyên liệu",
                "Lượng",
                "Đơn vị",
                "Đơn giá (đ)",
                "Thành tiền (đ)",
              ]}
              rows={purchases.flatMap((purchase) =>
                purchase.lines.map((line) => [
                  purchase.code,
                  purchase.date,
                  purchase.supplier,
                  purchase.phone,
                  line.ingredient,
                  line.quantity,
                  unitOf(line.ingredient),
                  line.price,
                  line.quantity * line.price,
                ])
              )}
            />
            <AddButton onClick={() => setAdding(true)}>
              Tạo phiếu nhập
            </AddButton>
          </>
        }
      />
      <SavedPurchasesTable />
      <Drawer
        open={adding}
        onOpenChange={setAdding}
        title="Tạo phiếu nhập nguyên liệu"
        description="Lưu phiếu sẽ ghi vào tổng nhập của tháng để kiểm kê."
        size={DRAWER_SIZE.Large}
        formId={FORM_ID}
        submitLabel="Lưu phiếu nhập"
      >
        {adding ? (
          <PurchaseForm formId={FORM_ID} onSaved={() => setAdding(false)} />
        ) : null}
      </Drawer>
    </>
  );
}
