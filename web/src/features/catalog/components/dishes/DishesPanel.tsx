"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Button } from "@/components/ui/Button";
import { Drawer, DRAWER_SIZE } from "@/components/ui/Drawer";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { useToast } from "@/components/ui/Toast";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { RowMenu } from "@/components/ui/RowMenu";
import { DISH_CATEGORY_LABEL, DISHES } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
  type CatalogDish,
} from "@/mocks/demoStore";

import { DishForm, NEW_DISH_ID } from "./DishForm";
import { DishTable } from "./DishTable";

const FORM_ID = "dish-form";

export function DishesPanel() {
  const showToast = useToast();
  const dishes = useDemoState((state) => state.dishes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = dishes.find((dish) => dish.id === editingId) ?? null;

  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const menuSets = useDemoState((state) => state.menuSets);

  const toggleActive = (dish: CatalogDish) => {
    updateDemoState({
      dishes: readDemoState().dishes.map((current) =>
        current.id === dish.id
          ? { ...current, active: !current.active }
          : current
      ),
    });
    showToast(
      dish.active
        ? "Đã ngưng phục vụ. Món đã dùng chỉ ngưng, không xóa."
        : "Đã phục vụ lại món này."
    );
  };

  /** Spec: a dish with history (sample data, or used in a set) is only deactivated. */
  const hasHistory = (dish: CatalogDish) =>
    DISHES.some((sample) => sample.id === dish.id) ||
    menuSets.some((set) => set.dishIds.includes(dish.id));

  const remove = (dish: CatalogDish) => {
    const current = readDemoState();
    const recipes = { ...current.recipes };
    delete recipes[dish.id];
    updateDemoState({
      dishes: current.dishes.filter((other) => other.id !== dish.id),
      recipes,
    });
    showToast(`Đã xóa món ${dish.name}`);
  };

  return (
    <>
      <PanelHeader
        title="Món và định lượng"
        count={dishes.length}
        subtitle="Giá cho bàn ăn chuẩn 10 người. Bấm một dòng để sửa."
        actions={
          <>
            <ExportButton
              fileName="danh-sach-mon"
              columns={[
                "Mã",
                "Món",
                "Loại",
                "Giá bán (đ)",
                "Trạng thái",
                "Mô tả",
              ]}
              rows={dishes.map((dish) => [
                dish.id,
                dish.name,
                DISH_CATEGORY_LABEL[dish.category],
                dish.price,
                dish.active ? "Đang phục vụ" : "Ngưng",
                dish.description,
              ])}
            />
            <AddButton onClick={() => setEditingId(NEW_DISH_ID)}>
              Thêm món
            </AddButton>
          </>
        }
      />
      <DishTable
        dishes={dishes}
        selectedId={editingId ?? ""}
        onSelect={setEditingId}
        renderActions={(dish) => (
          <RowMenu
            key="actions"
            label={`Thao tác với ${dish.name}`}
            items={[
              { label: "Sửa món", onSelect: () => setEditingId(dish.id) },
              {
                label: dish.active ? "Ngưng phục vụ" : "Phục vụ lại",
                onSelect: () => toggleActive(dish),
              },
              {
                label: hasHistory(dish) ? "Xóa (đã có lịch sử)" : "Xóa món",
                danger: true,
                disabled: hasHistory(dish),
                onSelect: () =>
                  setDeleting({
                    name: dish.name,
                    onConfirm: () => remove(dish),
                  }),
              },
            ]}
          />
        )}
      />
      <ConfirmDelete
        target={deleting}
        kind="món"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingId !== null}
        onOpenChange={(open) => {
          if (!open) setEditingId(null);
        }}
        title={editing ? `Sửa món: ${editing.name}` : "Thêm món"}
        description={
          editing
            ? "Hợp đồng đã chốt giữ giá cũ."
            : "Món mới hiển thị ngay trên thực đơn của khách."
        }
        size={DRAWER_SIZE.Large}
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Thêm món"}
        footerStart={
          editing ? (
            <Button
              variant={editing.active ? "danger" : "default"}
              onClick={() => toggleActive(editing)}
            >
              {editing.active ? "Ngưng phục vụ" : "Phục vụ lại"}
            </Button>
          ) : null
        }
      >
        <DishForm
          key={editingId}
          formId={FORM_ID}
          dish={editing}
          onSaved={() => setEditingId(null)}
        />
      </Drawer>
    </>
  );
}
