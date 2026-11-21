import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ToastButton } from "@/components/ui/ToastButton";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatMoney, formatPercent } from "@/lib/format";

import type { AffectedDish } from "../../lib/inventoryPeriod";

export function AffectedDishesTable({ dishes }: { dishes: AffectedDish[] }) {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">
        Món bị ảnh hưởng và giá gợi ý
      </h3>
      <DataTable
        columns={[
          "Món",
          num("Giá bán hiện tại"),
          num("Chi phí ước tính mới"),
          num(
            `Giá gợi ý (food cost mục tiêu ${formatPercent(BUSINESS_SETTINGS.foodCostTarget, 0)})`
          ),
          "",
        ]}
        rows={dishes.map((dish) => [
          dish.name,
          formatMoney(dish.price),
          formatMoney(dish.newCost),
          formatMoney(dish.newCost / BUSINESS_SETTINGS.foodCostTarget),
          <div key="actions" className="l-row flex-nowrap gap-1">
            <ToastButton
              size="sm"
              message="Đã cập nhật giá bán cho đơn mới, hợp đồng cũ giữ nguyên"
            >
              Dùng giá gợi ý
            </ToastButton>
            <Button size="sm">Giữ giá bán</Button>
          </div>,
        ])}
      />
      <p className="text-small text-soft">
        Giá món chỉ đổi khi quản lý chọn. Hợp đồng đã phát hành không bị ảnh
        hưởng.
      </p>
    </section>
  );
}
