"use client";

import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useDemoState } from "@/lib/demoStore";

export function ReportFilters() {
  const eventTypes = useDemoState((state) => state.eventTypes);

  return (
    <section className="card l-grid l-grid-4 p-3">
      <SelectField
        id="report-period"
        label="Kỳ"
        options={["Tháng", "Quý", "Năm", "Từ ngày đến ngày"]}
        defaultValue="Tháng"
      />
      <TextField id="report-from" label="Từ" placeholder="MM/yyyy" />
      <TextField id="report-to" label="Đến" placeholder="MM/yyyy" />
      <SelectField
        id="report-event"
        label="Loại tiệc"
        options={["Tất cả", ...eventTypes]}
        defaultValue="Tất cả"
      />
    </section>
  );
}
