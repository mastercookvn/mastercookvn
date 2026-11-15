"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { LIVE_VALIDATION_MODE, purchaseHeaderSchema } from "@/lib/validation";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { INGREDIENT_UNITS, INVENTORY_PERIOD } from "@/mocks/inventory";

import {
  parseLines,
  PurchaseLinesTable,
  sameName,
  type DraftLine,
} from "./PurchaseLinesTable";

export function PurchaseForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const ingredients = useDemoState((state) => state.ingredients);
  const periodClosed = useDemoState((state) => state.periodClosed);
  const showToast = useToast();

  const blankLine = (): DraftLine => ({
    ingredient: "",
    unit: INGREDIENT_UNITS[0],
    quantity: "",
    price: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors: headerErrors },
  } = useForm({
    resolver: zodResolver(purchaseHeaderSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { date: "05/11/2026", supplier: "", phone: "" },
  });
  const [lines, setLines] = useState<DraftLine[]>(() => [blankLine()]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const save = handleSubmit(({ date, supplier, phone }) => {
    const parsed = parseLines(lines);
    const problems = [
      ...(periodClosed && date.slice(3) === INVENTORY_PERIOD.month
        ? [
            `Tháng ${INVENTORY_PERIOD.month} đã chốt, không ghi phiếu nhập được.`,
          ]
        : []),
      ...(parsed.some((line) => line.ingredient === "")
        ? ["Nhập tên nguyên liệu cho mọi dòng."]
        : []),
      ...(parsed.some((line) => line.quantity <= 0 || line.price <= 0)
        ? ["Mỗi dòng cần lượng và đơn giá lớn hơn 0."]
        : []),
      ...(new Set(parsed.map((line) => line.ingredient.toLowerCase())).size !==
      lines.length
        ? ["Mỗi nguyên liệu chỉ ghi một dòng."]
        : []),
    ];
    setErrors(problems);
    if (problems.length > 0) return;

    const current = readDemoState();
    const code = `PN-${date.slice(0, 2)}${date.slice(3, 5)}-${String(current.purchases.length + 1).padStart(2, "0")}`;
    const newIngredients = parsed
      .filter(
        (line) =>
          !current.ingredients.some((known) =>
            sameName(known.name, line.ingredient)
          )
      )
      .map((line) => ({
        name: line.ingredient,
        unit: line.unit,
        price: line.price,
        usedIn: "Chưa dùng",
      }));
    updateDemoState({
      purchases: [
        {
          code,
          date,
          supplier,
          phone,
          lines: parsed,
          photos,
        },
        ...current.purchases,
      ],
      ingredients: [...newIngredients, ...current.ingredients],
    });
    showToast(
      newIngredients.length > 0
        ? `Đã lưu phiếu ${code}, thêm ${newIngredients.length} nguyên liệu mới vào danh mục`
        : `Đã lưu phiếu ${code} với ${parsed.length} dòng`
    );
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <section className="card l-grid l-grid-3">
        <TextField
          id="purchase-date"
          label="Ngày nhập"
          placeholder="dd/mm/yyyy"
          {...register("date")}
          error={headerErrors.date?.message}
        />
        <TextField
          id="purchase-supplier"
          label="Nhà cung cấp"
          placeholder="Chợ Bà Chiểu"
          {...register("supplier")}
          error={headerErrors.supplier?.message}
          hint="Mua ở chợ có thể bỏ trống SĐT."
        />
        <TextField
          id="purchase-phone"
          label="SĐT nhà cung cấp"
          type="tel"
          inputMode="tel"
          {...register("phone")}
          error={headerErrors.phone?.message}
        />
      </section>
      <PurchaseLinesTable
        lines={lines}
        ingredients={ingredients}
        onChange={setLines}
      />
      <div className="l-between">
        <Button onClick={() => setLines([...lines, blankLine()])}>
          <PlusIcon size={18} />
          Thêm dòng
        </Button>
        <p className="text-small text-soft">
          Gõ tên nguyên liệu đã mua. Tên đã có thì tự điền đơn vị và giá.
        </p>
      </div>
      <section className="card">
        <PhotoGalleryField
          id="purchase-photos"
          label="Ảnh hóa đơn, phiếu mua"
          photos={photos}
          onChange={setPhotos}
          hint="Không bắt buộc. Mua ở chợ có thể chụp giấy ghi tay."
        />
      </section>
      {errors.length > 0 ? (
        <ul className="l-stack gap-0.5" role="alert">
          {errors.map((error) => (
            <li key={error} className="field-error">
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
