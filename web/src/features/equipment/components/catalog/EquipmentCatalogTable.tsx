"use client";

import Image from "next/image";
import { useState } from "react";

import { CrateIcon } from "@/components/icons";
import { AddButton } from "@/components/ui/AddButton";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { Drawer } from "@/components/ui/Drawer";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { RowMenu } from "@/components/ui/RowMenu";
import { useToast } from "@/components/ui/Toast";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ROLE, type Role } from "@/constants/roles";
import { formatMoney, formatNumber } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { EQUIPMENT, type EquipmentType } from "@/mocks/equipment";

import { EquipmentForm } from "./EquipmentForm";

const FORM_ID = "equipment-form";
const NEW_EQUIPMENT = "new";

/** Stock or sample history keeps the item; only an unused new item can go. */
const blockReason = (item: EquipmentType) =>
  EQUIPMENT.some((sample) => sample.name === item.name)
    ? "đã có lịch sử"
    : item.owned > 0
      ? "còn tồn kho"
      : null;

export function EquipmentCatalogTable({ roles }: { roles: Role[] }) {
  const equipment = useDemoState((state) => state.equipment);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const showToast = useToast();
  const editing = equipment.find((item) => item.name === editingName) ?? null;
  const canEditCompensation = roles.includes(ROLE.BranchManager);

  return (
    <>
      <PanelHeader
        title="Danh mục dụng cụ"
        count={equipment.length}
        subtitle="Lượng tồn tăng qua phiếu nhập mua. Giá bồi thường chỉ Quản lý cơ sở được sửa."
        actions={
          <AddButton onClick={() => setEditingName(NEW_EQUIPMENT)}>
            Thêm dụng cụ
          </AddButton>
        }
      />
      <DataTable
        columns={[
          "Dụng cụ",
          "Đơn vị",
          "Cơ sở định mức",
          num("Định mức"),
          num("Dự trù"),
          num("Tối thiểu"),
          num("Giá bồi thường"),
          "",
        ]}
        rows={equipment.map((item) => [
          <span key="name" className="l-row flex-nowrap gap-2.5">
            <span className="receipt-thumb">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <span className="grid h-full place-items-center text-ink-subtle">
                  <CrateIcon size={18} />
                </span>
              )}
            </span>
            {item.name}
          </span>,
          item.unit,
          item.basis,
          item.rate ?? "Nhập tay",
          item.reserve ? `${Math.round(item.reserve * 100)}%` : "Trống",
          formatNumber(item.minimum),
          formatMoney(item.compensation),
          <RowMenu
            key="actions"
            label={`Thao tác với ${item.name}`}
            items={[
              {
                label: "Sửa dụng cụ",
                onSelect: () => setEditingName(item.name),
              },
              {
                label: blockReason(item)
                  ? `Xóa (${blockReason(item)})`
                  : "Xóa dụng cụ",
                danger: true,
                disabled: blockReason(item) !== null,
                onSelect: () =>
                  setDeleting({
                    name: item.name,
                    onConfirm: () => {
                      updateDemoState({
                        equipment: readDemoState().equipment.filter(
                          (other) => other.name !== item.name
                        ),
                      });
                      showToast(`Đã xóa ${item.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="dụng cụ"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingName !== null}
        onOpenChange={(open) => {
          if (!open) setEditingName(null);
        }}
        title={editing ? `Sửa: ${editing.name}` : "Thêm dụng cụ"}
        description={
          editing
            ? "Tồn kho chỉ đổi qua phiếu nhập mua, kiểm đếm và xử lý đồ hư."
            : "Dụng cụ mới có tồn bằng 0. Tạo phiếu nhập mua để có hàng."
        }
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Thêm dụng cụ"}
      >
        {editingName === null ? null : (
          <EquipmentForm
            key={editingName}
            formId={FORM_ID}
            item={editing}
            canEditCompensation={canEditCompensation}
            onSaved={() => setEditingName(null)}
          />
        )}
      </Drawer>
    </>
  );
}
