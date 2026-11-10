"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatNumber } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";

import { DamageHandlingForm } from "./DamageHandlingForm";

const FORM_ID = "damage-form";

export function DamagePanel() {
  const equipment = useDemoState((state) => state.equipment);
  const damaged = equipment.filter((item) => item.damaged > 0);
  const [handlingName, setHandlingName] = useState<string | null>(null);
  const handling = damaged.find((item) => item.name === handlingName) ?? null;

  return (
    <>
      <PanelHeader
        title="Đồ hư cần xử lý"
        count={damaged.length}
        subtitle="Đồ hư ghi nhận khi kiểm đếm sau bữa. Phục hồi về sẵn sàng hoặc loại bỏ khỏi sở hữu."
      />
      {damaged.length === 0 ? (
        <EmptyState>Không còn dụng cụ hư cần xử lý.</EmptyState>
      ) : (
        <DataTable
          columns={[
            "Dụng cụ",
            num("Đang hư"),
            num("Sẵn sàng"),
            num("Sở hữu"),
            "",
          ]}
          rows={damaged.map((item) => [
            item.name,
            `${item.damaged} ${item.unit}`,
            formatNumber(item.ready),
            formatNumber(item.owned),
            <Button
              key="handle"
              size="sm"
              onClick={() => setHandlingName(item.name)}
            >
              Xử lý
            </Button>,
          ])}
        />
      )}
      <Drawer
        open={handling !== null}
        onOpenChange={(open) => {
          if (!open) setHandlingName(null);
        }}
        title={handling ? `Xử lý đồ hư: ${handling.name}` : "Xử lý đồ hư"}
        description="Phục hồi cộng vào Sẵn sàng. Loại bỏ trừ khỏi Sở hữu."
        formId={FORM_ID}
        submitLabel="Lưu xử lý"
      >
        {handling ? (
          <DamageHandlingForm
            key={handling.name}
            formId={FORM_ID}
            item={handling}
            onSaved={() => setHandlingName(null)}
          />
        ) : null}
      </Drawer>
    </>
  );
}
