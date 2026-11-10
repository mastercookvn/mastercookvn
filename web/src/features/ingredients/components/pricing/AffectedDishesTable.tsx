import { Button } from "@/components/ui/Button";
import { DataTable, num } from "@/components/ui/DataTable";
import { ToastButton } from "@/components/ui/ToastButton";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatMoney } from "@/lib/format";
import { PRICE_PROPOSALS } from "@/mocks/inventory";

const NEW_COST = 1.2 * PRICE_PROPOSALS[3].proposed + 9000;

export function AffectedDishesTable() {
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
          num("Giá gợi ý (food cost 35%)"),
          "",
        ]}
        rows={[
          [
            "Gà hấp lá chanh",
            formatMoney(420000),
            formatMoney(NEW_COST),
            formatMoney(NEW_COST / BUSINESS_SETTINGS.foodCostTarget),
            <div key="actions" className="l-row flex-nowrap gap-1">
              <ToastButton
                size="sm"
                message="Đã cập nhật giá bán cho đơn mới, hợp đồng cũ giữ nguyên"
              >
                Dùng giá gợi ý
              </ToastButton>
              <Button size="sm">Giữ giá bán</Button>
            </div>,
          ],
        ]}
      />
      <p className="text-small text-soft">
        Giá món chỉ đổi khi quản lý chọn. Hợp đồng đã phát hành không bị ảnh
        hưởng.
      </p>
    </section>
  );
}
