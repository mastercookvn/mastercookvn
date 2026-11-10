"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Badge } from "@/components/ui/Badge";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { DataTable } from "@/components/ui/DataTable";
import { Drawer } from "@/components/ui/Drawer";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { RowMenu } from "@/components/ui/RowMenu";
import { num } from "@/components/ui/tableColumns";
import { useToast } from "@/components/ui/Toast";
import { formatMoney } from "@/lib/format";
import { MENU_SETS, type MenuSet } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import { MenuSetForm } from "./MenuSetForm";

const FORM_ID = "menu-set-form";
const NEW_SET = "new";

/** Sample sets are already on contracts, so they can only be deactivated. */
const hasHistory = (set: MenuSet) =>
  MENU_SETS.some((sample) => sample.id === set.id);

export function MenuSetTable() {
  const showToast = useToast();
  const menuSets = useDemoState((state) => state.menuSets);
  const dishes = useDemoState((state) => state.dishes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const editing = menuSets.find((set) => set.id === editingId) ?? null;

  const dishesOf = (dishIds: string[]) =>
    dishes.filter((dish) => dishIds.includes(dish.id));

  const toggleActive = (set: MenuSet) => {
    updateDemoState({
      menuSets: readDemoState().menuSets.map((other) =>
        other.id === set.id
          ? { ...other, active: other.active === false }
          : other
      ),
    });
    showToast(
      set.active === false ? `Đã mở lại ${set.name}` : `Đã ngưng ${set.name}`
    );
  };

  return (
    <>
      <PanelHeader
        title="Set thực đơn"
        count={menuSets.length}
        subtitle="Giá set bằng tổng giá món, không cộng lợi nhuận lần nữa"
        actions={
          <AddButton onClick={() => setEditingId(NEW_SET)}>
            Thêm set thực đơn
          </AddButton>
        }
      />
      <DataTable
        columns={[
          "Set",
          "Phù hợp",
          "Số món",
          "Danh sách món",
          num("Giá / bàn chuẩn"),
          "Trạng thái",
          "",
        ]}
        rowActions={menuSets.map((set) => ({
          onSelect: () => setEditingId(set.id),
          selected: set.id === editingId,
        }))}
        rows={menuSets.map((set) => [
          <b key="name">{set.name}</b>,
          set.suitableFor,
          set.dishIds.length,
          <span key="dishes" className="text-small text-soft">
            {dishesOf(set.dishIds)
              .map((dish) => dish.name)
              .join(", ")}
          </span>,
          formatMoney(
            dishesOf(set.dishIds).reduce((sum, dish) => sum + dish.price, 0)
          ),
          set.active === false ? (
            <Badge key="status" tone="neutral">
              Ngưng
            </Badge>
          ) : (
            <Badge key="status" tone="good">
              Đang phục vụ
            </Badge>
          ),
          <RowMenu
            key="actions"
            label={`Thao tác với ${set.name}`}
            items={[
              { label: "Sửa set", onSelect: () => setEditingId(set.id) },
              {
                label: set.active === false ? "Phục vụ lại" : "Ngưng phục vụ",
                onSelect: () => toggleActive(set),
              },
              {
                label: hasHistory(set) ? "Xóa (đã có lịch sử)" : "Xóa set",
                danger: true,
                disabled: hasHistory(set),
                onSelect: () =>
                  setDeleting({
                    name: set.name,
                    onConfirm: () => {
                      updateDemoState({
                        menuSets: readDemoState().menuSets.filter(
                          (other) => other.id !== set.id
                        ),
                      });
                      showToast(`Đã xóa ${set.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="set thực đơn"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingId !== null}
        onOpenChange={(open) => {
          if (!open) setEditingId(null);
        }}
        title={editing ? `Sửa set: ${editing.name}` : "Thêm set thực đơn"}
        description="Chọn món từ danh mục. Giá set tự tính."
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Thêm set"}
      >
        {editingId === null ? null : (
          <MenuSetForm
            key={editingId}
            formId={FORM_ID}
            set={editing}
            onSaved={() => setEditingId(null)}
          />
        )}
      </Drawer>
    </>
  );
}
