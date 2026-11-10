"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatMoney } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import { purchaseTotal } from "@/mocks/inventory";

export function SavedPurchasesTable() {
  const purchases = useDemoState((state) => state.purchases);

  return (
    <>
      {purchases.length === 0 ? (
        <EmptyState>
          Chưa có phiếu nhập nào. Bấm “Tạo phiếu nhập” để ghi phiếu đầu tiên.
        </EmptyState>
      ) : (
        <DataTable
          columns={[
            "Mã phiếu",
            "Ngày",
            "Nhà cung cấp",
            num("Số dòng"),
            num("Tổng"),
            num("Ảnh"),
          ]}
          rows={purchases.map((purchase) => [
            <span key="code" className="text-code">
              {purchase.code}
            </span>,
            purchase.date,
            purchase.supplier,
            purchase.lines.length,
            formatMoney(purchaseTotal(purchase.lines)),
            purchase.photos?.length ?? 0,
          ])}
        />
      )}
    </>
  );
}
