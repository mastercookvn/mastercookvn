"use client";

import Image from "next/image";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatMoney } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import { equipmentPurchaseTotal } from "@/mocks/equipment";

export function SavedEquipmentPurchases() {
  const purchases = useDemoState((state) => state.equipmentPurchases);
  const equipment = useDemoState((state) => state.equipment);
  const unitOf = (name: string) =>
    equipment.find((item) => item.name === name)?.unit ?? "";

  return (
    <>
      {purchases.length === 0 ? (
        <EmptyState>
          Chưa có phiếu nhập dụng cụ. Bấm “Tạo phiếu nhập” để ghi phiếu đầu
          tiên.
        </EmptyState>
      ) : (
        <DataTable
          columns={[
            "Mã phiếu",
            "Ngày",
            "Nhà cung cấp",
            "Dụng cụ",
            num("Tổng"),
            "Hóa đơn",
          ]}
          rows={purchases.map((purchase) => [
            <span key="code" className="text-code">
              {purchase.code}
            </span>,
            purchase.date,
            purchase.supplier,
            purchase.lines
              .map(
                (line) =>
                  `${line.equipment} ×${line.quantity} ${unitOf(line.equipment)}`
              )
              .join(", "),
            formatMoney(equipmentPurchaseTotal(purchase.lines)),
            purchase.photos.length === 0 ? (
              <span key="photos" className="text-soft">
                Không có
              </span>
            ) : (
              <div key="photos" className="l-row gap-1">
                {purchase.photos.map((photo, index) => (
                  <span key={index} className="receipt-thumb">
                    <Image
                      src={photo}
                      alt={`Hóa đơn ${index + 1} của ${purchase.code}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
            ),
          ])}
        />
      )}
    </>
  );
}
