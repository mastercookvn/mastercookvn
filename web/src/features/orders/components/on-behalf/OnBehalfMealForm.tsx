"use client";

import { useState } from "react";

import { EventDatePicker } from "@/components/ui/EventDatePicker";
import { SelectField } from "@/components/ui/SelectField";
import { ServicePicker } from "@/components/ui/ServicePicker";
import { ServingWavesEditor } from "@/components/ui/ServingWavesEditor";
import { TextField } from "@/components/ui/TextField";
import type { ServingWave } from "@/lib/servingWaves";
import { EVENT_TYPES, MENU_SETS } from "@/mocks/catalog";

export function OnBehalfMealForm() {
  const [date, setDate] = useState("28/11/2026");
  const [guestsPerTable, setGuestsPerTable] = useState(10);
  const [waves, setWaves] = useState<ServingWave[]>([
    { from: "18:00", to: "21:00", tables: 8 },
  ]);
  const [serviceIds, setServiceIds] = useState<string[]>(["don"]);

  return (
    <section className="card l-stack gap-5">
      <h3 className="card-title card-title-flush">Bữa 1</h3>
      <div className="l-grid l-grid-2">
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
      </div>

      <fieldset className="form-section">
        <legend>Ngày tổ chức</legend>
        <EventDatePicker id="behalf-date" value={date} onChange={setDate} />
      </fieldset>

      <fieldset className="form-section">
        <legend>Lượt đãi</legend>
        <TextField
          id="behalf-guests"
          label="Người mỗi bàn"
          type="number"
          inputMode="numeric"
          min={10}
          className="max-w-[160px]"
          value={guestsPerTable}
          onChange={(event) => setGuestsPerTable(Number(event.target.value))}
        />
        <ServingWavesEditor
          idPrefix="behalf"
          waves={waves}
          guestsPerTable={guestsPerTable}
          onChange={setWaves}
        />
      </fieldset>

      <fieldset className="form-section">
        <legend>Thực đơn và dịch vụ</legend>
        <SelectField
          id="behalf-set"
          label="Thực đơn"
          options={MENU_SETS.map((set) => set.name)}
          defaultValue="Set Sum Vầy"
        />
        <ServicePicker selected={serviceIds} onChange={setServiceIds} />
      </fieldset>
    </section>
  );
}
