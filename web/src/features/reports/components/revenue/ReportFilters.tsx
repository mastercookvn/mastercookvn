import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { EVENT_TYPES } from "@/mocks/catalog";

export function ReportFilters() {
  return (
    <section className="card l-grid l-grid-4 p-3">
      <SelectField
        id="report-period"
        label="Kỳ"
        options={["Tháng", "Quý", "Năm", "Từ ngày đến ngày"]}
        defaultValue="Tháng"
      />
      <TextField id="report-from" label="Từ" defaultValue="06/2026" />
      <TextField id="report-to" label="Đến" defaultValue="10/2026" />
      <SelectField
        id="report-event"
        label="Loại tiệc"
        options={["Tất cả", ...EVENT_TYPES]}
        defaultValue="Tất cả"
      />
    </section>
  );
}
