"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Drawer, DRAWER_SIZE } from "@/components/ui/Drawer";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { useDemoState } from "@/mocks/demoStore";

import { EquipmentPurchaseForm, shortfall } from "./EquipmentPurchaseForm";
import { SavedEquipmentPurchases } from "./SavedEquipmentPurchases";

const FORM_ID = "equipment-purchase-form";

const DRAFT = {
  Closed: "closed",
  Blank: "blank",
  Shortfall: "shortfall",
} as const;

type Draft = (typeof DRAFT)[keyof typeof DRAFT];

export function EquipmentPurchasesPanel() {
  const purchases = useDemoState((state) => state.equipmentPurchases);
  const equipment = useDemoState((state) => state.equipment);
  const [draft, setDraft] = useState<Draft>(DRAFT.Closed);
  const belowMinimum = equipment.filter((item) => shortfall(item) > 0);
  const unitOf = (name: string) =>
    equipment.find((item) => item.name === name)?.unit ?? "";

  return (
    <>
      <PanelHeader
        title="Phiếu nhập mua dụng cụ"
        count={purchases.length}
        actions={
          <>
            <ExportButton
              fileName="phieu-nhap-dung-cu"
              columns={[
                "Mã phiếu",
                "Ngày nhập",
                "Nhà cung cấp",
                "SĐT",
                "Dụng cụ",
                "Số lượng",
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
                  line.equipment,
                  line.quantity,
                  unitOf(line.equipment),
                  line.price,
                  line.quantity * line.price,
                ])
              )}
            />
            <AddButton onClick={() => setDraft(DRAFT.Blank)}>
              Tạo phiếu nhập
            </AddButton>
          </>
        }
      />

      {belowMinimum.length > 0 ? (
        <Alert tone="wait" className="l-between">
          <span>
            {belowMinimum.length} loại đang dưới tồn tối thiểu:{" "}
            {belowMinimum
              .map((item) => `${item.name} (thiếu ${shortfall(item)})`)
              .join(", ")}
            .
          </span>
          <Button size="sm" onClick={() => setDraft(DRAFT.Shortfall)}>
            Tạo phiếu cho hàng thiếu
          </Button>
        </Alert>
      ) : null}

      <SavedEquipmentPurchases />

      <Drawer
        open={draft !== DRAFT.Closed}
        onOpenChange={(open) => {
          if (!open) setDraft(DRAFT.Closed);
        }}
        title="Tạo phiếu nhập mua dụng cụ"
        size={DRAWER_SIZE.Large}
        formId={FORM_ID}
        submitLabel="Lưu phiếu nhập"
      >
        {draft === DRAFT.Closed ? null : (
          <EquipmentPurchaseForm
            formId={FORM_ID}
            fillShortfall={draft === DRAFT.Shortfall}
            onSaved={() => setDraft(DRAFT.Closed)}
          />
        )}
      </Drawer>
    </>
  );
}
