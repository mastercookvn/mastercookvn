"use client";

import { useState } from "react";

import { CloseIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { Select } from "@/components/ui/Select";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatMoney, formatNumber } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { equipmentPurchaseTotal, type EquipmentType } from "@/mocks/equipment";

type DraftLine = { equipment: string; quantity: string; price: string };

const DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const parseInteger = (text: string) => Number(text.replace(/\D/g, "")) || 0;

export const shortfall = (item: EquipmentType) =>
  Math.max(item.minimum - item.ready, 0);

export function EquipmentPurchaseForm({
  formId,
  fillShortfall,
  onSaved,
}: {
  formId: string;
  fillShortfall: boolean;
  onSaved: () => void;
}) {
  const equipment = useDemoState((state) => state.equipment);
  const showToast = useToast();

  const lineFor = (item: EquipmentType, quantity = 0): DraftLine => ({
    equipment: item.name,
    quantity: quantity > 0 ? formatNumber(quantity) : "",
    price: formatNumber(item.purchasePrice),
  });

  const firstUnused = (used: DraftLine[]) =>
    equipment.find(
      (item) => !used.some((line) => line.equipment === item.name)
    ) ?? equipment[0];

  const [date, setDate] = useState("05/11/2026");
  const [supplier, setSupplier] = useState("");
  const [phone, setPhone] = useState("");
  const [lines, setLines] = useState<DraftLine[]>(() => {
    const short = equipment.filter((item) => shortfall(item) > 0);
    return fillShortfall && short.length > 0
      ? short.map((item) => lineFor(item, shortfall(item)))
      : [lineFor(equipment[0])];
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const itemOf = (name: string) => equipment.find((item) => item.name === name);
  const parsed = lines.map((line) => ({
    equipment: line.equipment,
    quantity: parseInteger(line.quantity),
    price: parseInteger(line.price),
  }));
  const update = (index: number, patch: Partial<DraftLine>) =>
    setLines(
      lines.map((line, i) => (i === index ? { ...line, ...patch } : line))
    );

  const save = () => {
    const problems = [
      ...(DATE.test(date.trim()) ? [] : ["Ngày nhập theo dạng dd/mm/yyyy."]),
      ...(supplier.trim() ? [] : ["Nhập tên nhà cung cấp."]),
      ...(lines.length === 0 ? ["Thêm ít nhất một dòng dụng cụ."] : []),
      ...(parsed.some((line) => line.quantity <= 0 || line.price <= 0)
        ? ["Mỗi dòng cần số lượng và đơn giá lớn hơn 0."]
        : []),
      ...(new Set(lines.map((line) => line.equipment)).size !== lines.length
        ? ["Mỗi dụng cụ chỉ ghi một dòng."]
        : []),
    ];
    setErrors(problems);
    if (problems.length > 0) return;

    const current = readDemoState();
    const code = `PNDC-${date.slice(0, 2)}${date.slice(3, 5)}-${String(current.equipmentPurchases.length + 1).padStart(2, "0")}`;
    updateDemoState({
      equipmentPurchases: [
        {
          code,
          date: date.trim(),
          supplier: supplier.trim(),
          phone: phone.trim(),
          lines: parsed,
          photos,
        },
        ...current.equipmentPurchases,
      ],
      equipment: current.equipment.map((item) => {
        const bought = parsed.find((line) => line.equipment === item.name);
        return bought
          ? {
              ...item,
              owned: item.owned + bought.quantity,
              ready: item.ready + bought.quantity,
              purchasePrice: bought.price,
            }
          : item;
      }),
    });
    showToast(
      `Đã lưu ${code}: ${parsed.length} loại, tăng sở hữu và sẵn sàng tương ứng`
    );
    onSaved();
  };

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <section className="card l-stack">
        <h3 className="card-title card-title-flush">Thông tin phiếu</h3>
        <div className="l-grid l-grid-3">
          <TextField
            id="equipment-purchase-date"
            label="Ngày nhập"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            id="equipment-purchase-supplier"
            label="Nhà cung cấp"
            placeholder="Inox Thành Tâm"
            value={supplier}
            onChange={(event) => setSupplier(event.target.value)}
          />
          <TextField
            id="equipment-purchase-phone"
            label="SĐT nhà cung cấp"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </section>

      <section className="card l-stack">
        <h3 className="card-title card-title-flush">Dụng cụ mua</h3>
        <div className="purchase-lines">
          <div className="purchase-line is-head" aria-hidden="true">
            <span>Dụng cụ</span>
            <span className="is-num">Số lượng</span>
            <span className="is-num">Đơn giá (đ)</span>
            <span className="is-num">Thành tiền</span>
            <span />
          </div>
          {lines.map((line, index) => {
            const item = itemOf(line.equipment);
            const duplicate =
              lines.findIndex((other) => other.equipment === line.equipment) !==
              index;
            return (
              <div key={index} className="purchase-line">
                <div className="purchase-line-name">
                  <Select
                    aria-label={`Dụng cụ dòng ${index + 1}`}
                    value={line.equipment}
                    options={equipment.map((option) => option.name)}
                    onValueChange={(value) => {
                      const next = itemOf(value);
                      update(index, {
                        equipment: value,
                        price: next
                          ? formatNumber(next.purchasePrice)
                          : line.price,
                      });
                    }}
                  />
                  {item ? (
                    <small className="text-soft">
                      Sẵn sàng {formatNumber(item.ready)} / tối thiểu{" "}
                      {formatNumber(item.minimum)} {item.unit}
                    </small>
                  ) : null}
                  {duplicate ? (
                    <small className="field-error">Trùng dòng phía trên</small>
                  ) : null}
                </div>
                <label className="purchase-line-field">
                  <span>Số lượng ({item?.unit})</span>
                  <input
                    inputMode="numeric"
                    className={
                      line.quantity === "" || parsed[index].quantity > 0
                        ? "input-cell"
                        : "input-cell has-error"
                    }
                    value={line.quantity}
                    placeholder="0"
                    onChange={(event) =>
                      update(index, {
                        quantity:
                          event.target.value === ""
                            ? ""
                            : formatNumber(parseInteger(event.target.value)),
                      })
                    }
                  />
                </label>
                <label className="purchase-line-field">
                  <span>Đơn giá (đ)</span>
                  <input
                    inputMode="numeric"
                    className={
                      parsed[index].price > 0
                        ? "input-cell"
                        : "input-cell has-error"
                    }
                    value={line.price}
                    onChange={(event) =>
                      update(index, {
                        price: formatNumber(parseInteger(event.target.value)),
                      })
                    }
                  />
                </label>
                <span className="purchase-line-total">
                  {formatMoney(parsed[index].quantity * parsed[index].price)}
                </span>
                <Button
                  size="sm"
                  variant="text"
                  aria-label={`Xóa dòng ${index + 1}`}
                  disabled={lines.length === 1}
                  onClick={() => setLines(lines.filter((_, i) => i !== index))}
                >
                  <CloseIcon size={16} />
                </Button>
              </div>
            );
          })}
        </div>
        <div className="l-between">
          <Button
            disabled={lines.length >= equipment.length}
            onClick={() => setLines([...lines, lineFor(firstUnused(lines))])}
          >
            <PlusIcon size={18} />
            Thêm dòng
          </Button>
          <p className="purchase-sum">
            Tổng phiếu <b>{formatMoney(equipmentPurchaseTotal(parsed))}</b>
          </p>
        </div>
      </section>

      <section className="card l-stack">
        <PhotoGalleryField
          id="equipment-purchase-photos"
          label="Ảnh hóa đơn, phiếu giao hàng"
          photos={photos}
          onChange={setPhotos}
          hint="Không bắt buộc, giúp kế toán đối chiếu."
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
