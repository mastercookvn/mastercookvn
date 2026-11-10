"use client";

import { useState } from "react";

import { EventDatePicker } from "@/components/ui/EventDatePicker";
import { SelectField } from "@/components/ui/SelectField";
import { ServingWavesEditor } from "@/components/ui/ServingWavesEditor";
import { TextField } from "@/components/ui/TextField";
import type { ServingWave } from "@/lib/servingWaves";
import { EVENT_TYPES, MENU_SETS, SERVICES } from "@/mocks/catalog";

export function OnBehalfMealForm() {
  const [date, setDate] = useState("28/11/2026");
  const [guestsPerTable, setGuestsPerTable] = useState(10);
  const [waves, setWaves] = useState<ServingWave[]>([
    { from: "18:00", to: "21:00", tables: 8 },
  ]);

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Bữa 1</h3>
      <div className="l-grid l-grid-3">
        <SelectField
          id="behalf-event"
          label="Loại tiệc"
          options={EVENT_TYPES}
          defaultValue="Sinh nhật"
        />
        <TextField
          id="behalf-address"
          label="Địa chỉ"
          defaultValue="9 Hoa Sứ, Phú Nhuận, TP.HCM"
        />
        <TextField
          id="behalf-guests"
          label="Người mỗi bàn"
          type="number"
          min={10}
          value={guestsPerTable}
          onChange={(event) => setGuestsPerTable(Number(event.target.value))}
        />
      </div>
      <div className="l-grid l-grid-2 items-start">
        <div className="l-stack gap-2">
          <span className="text-small font-semibold">Ngày tổ chức</span>
          <EventDatePicker id="behalf-date" value={date} onChange={setDate} />
        </div>
        <div className="l-stack gap-2">
          <span className="text-small font-semibold">Lượt đãi</span>
          <ServingWavesEditor
            idPrefix="behalf"
            waves={waves}
            guestsPerTable={guestsPerTable}
            onChange={setWaves}
          />
        </div>
      </div>
      <div className="l-grid l-grid-2">
        <SelectField
          id="behalf-set"
          label="Thực đơn"
          options={MENU_SETS.map((set) => set.name)}
          defaultValue="Set Sum Vầy"
        />
        <SelectField
          id="behalf-service"
          label="Dịch vụ"
          options={SERVICES.map((service) => service.name)}
          defaultValue="Dọn dẹp sau tiệc"
        />
      </div>
    </section>
  );
}
