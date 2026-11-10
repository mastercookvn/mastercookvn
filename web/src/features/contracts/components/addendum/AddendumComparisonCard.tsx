import { Button } from "@/components/ui/Button";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatMoney } from "@/lib/format";
import { ADDENDUM_HOUSEWARMING as addendum } from "@/mocks/contracts";

import { BeforeAfterTable } from "./BeforeAfterTable";

export function AddendumComparisonCard() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Trước và sau</h3>
      <BeforeAfterTable />
      <MoneyRow label="Chênh lệch" value={formatMoney(addendum.difference)} />
      <MoneyRow
        label="Cọc bổ sung 50% phần tăng"
        value={formatMoney(addendum.extraDeposit)}
        total
      />
      <div className="l-row justify-end">
        <Button>Hủy phụ lục</Button>
        <ToastButton message="Bản mẫu: tải bản ký giấy">
          Upload bản ký
        </ToastButton>
        <ToastButton
          variant="primary"
          message={`Đã gửi phụ lục ${addendum.number}, chờ khách xác nhận`}
        >
          Gửi phụ lục
        </ToastButton>
      </div>
    </section>
  );
}
