"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { Drawer } from "@/components/ui/Drawer";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { RowMenu } from "@/components/ui/RowMenu";
import { useToast } from "@/components/ui/Toast";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { INGREDIENTS, type Ingredient } from "@/mocks/inventory";

import { IngredientForm } from "./IngredientForm";

const FORM_ID = "ingredient-form";
const NEW_INGREDIENT = "new";

export function IngredientTable() {
  const ingredients = useDemoState((state) => state.ingredients);
  const recipes = useDemoState((state) => state.recipes);
  const purchases = useDemoState((state) => state.purchases);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const showToast = useToast();
  const editing =
    ingredients.find((ingredient) => ingredient.name === editingName) ?? null;

  /** Kept when it is sample data, in a recipe, or on a purchase receipt. */
  const blockReason = (ingredient: Ingredient) =>
    INGREDIENTS.some((sample) => sample.name === ingredient.name)
      ? "đã có lịch sử"
      : Object.values(recipes).some((lines) =>
            lines.some((line) => line.ingredient === ingredient.name)
          )
        ? "đang dùng trong định lượng"
        : purchases.some((purchase) =>
              purchase.lines.some((line) => line.ingredient === ingredient.name)
            )
          ? "đã có phiếu nhập"
          : null;

  return (
    <>
      <PanelHeader
        title="Danh mục nguyên liệu"
        count={ingredients.length}
        actions={
          <>
            <ExportButton
              fileName="danh-muc-nguyen-lieu"
              columns={[
                "Nguyên liệu",
                "Đơn vị chuẩn",
                "Giá hiện hành (đ)",
                "Dùng trong món",
              ]}
              rows={ingredients.map((row) => [
                row.name,
                row.unit,
                row.price,
                row.usedIn,
              ])}
            />
            <AddButton onClick={() => setEditingName(NEW_INGREDIENT)}>
              Thêm nguyên liệu
            </AddButton>
          </>
        }
      />
      <DataTable
        columns={[
          "Nguyên liệu",
          "Đơn vị chuẩn",
          num("Giá hiện hành"),
          "Dùng trong món",
          "Trạng thái",
          "",
        ]}
        rowActions={ingredients.map((row) => ({
          onSelect: () => setEditingName(row.name),
          selected: row.name === editingName,
        }))}
        rows={ingredients.map((row) => [
          row.name,
          row.unit,
          formatMoney(row.price),
          <span key="used" className="text-small text-soft">
            {row.usedIn}
          </span>,
          <Badge key="status" tone="good">
            Đang dùng
          </Badge>,
          <RowMenu
            key="actions"
            label={`Thao tác với ${row.name}`}
            items={[
              {
                label: "Sửa tên, đơn vị, giá",
                onSelect: () => setEditingName(row.name),
              },
              {
                label: blockReason(row)
                  ? `Xóa (${blockReason(row)})`
                  : "Xóa nguyên liệu",
                danger: true,
                disabled: blockReason(row) !== null,
                onSelect: () =>
                  setDeleting({
                    name: row.name,
                    onConfirm: () => {
                      updateDemoState({
                        ingredients: readDemoState().ingredients.filter(
                          (other) => other.name !== row.name
                        ),
                      });
                      showToast(`Đã xóa ${row.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="nguyên liệu"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingName !== null}
        onOpenChange={(open) => {
          if (!open) setEditingName(null);
        }}
        title={editing ? `Sửa: ${editing.name}` : "Thêm nguyên liệu"}
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Thêm nguyên liệu"}
      >
        {editingName === null ? null : (
          <IngredientForm
            key={editingName}
            formId={FORM_ID}
            ingredient={editing}
            onSaved={() => setEditingName(null)}
          />
        )}
      </Drawer>
    </>
  );
}
