import { Alert } from "@/components/ui/Alert";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { ADDENDUM_HOUSEWARMING as addendum } from "@/mocks/contracts";

import { AddendumChecks } from "./AddendumChecks";

const maxReduction = Math.floor(
  addendum.tablesBefore * BUSINESS_SETTINGS.maxTableReductionRate,
);

export function AddendumChangeCard() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Nội dung thay đổi</h3>
      <div className="l-grid l-grid-2">
        <TextField
          id="addendum-tables"
          label="Số bàn ăn mới"
          defaultValue={addendum.tablesAfter}
          hint={`Ký ban đầu ${addendum.tablesBefore}. Được giảm tối đa ${maxReduction} bàn.`}
        />
        <SelectField
          id="addendum-dish"
          label="Đổi món"
          options={["Không đổi", "Bò lúc lắc → Tôm sú hấp bia"]}
          defaultValue="Không đổi"
        />
      </div>
      <AddendumChecks />
      <Alert tone="info">
        Không hỗ trợ dời ngày, thêm món mới hoặc thêm dịch vụ ngoài hợp đồng.
      </Alert>
    </section>
  );
}
