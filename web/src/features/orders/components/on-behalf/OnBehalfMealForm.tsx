import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { EVENT_TYPES, MENU_SETS, SERVICES } from "@/mocks/catalog";

export function OnBehalfMealForm() {
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
        <TextField id="behalf-date" label="Ngày" defaultValue="28/11/2026" />
        <TextField id="behalf-time" label="Giờ" defaultValue="18:00–21:00" />
        <TextField
          id="behalf-address"
          label="Địa chỉ"
          defaultValue="9 Hoa Sứ, Phú Nhuận, TP.HCM"
        />
        <TextField id="behalf-tables" label="Số bàn ăn" defaultValue="8" />
        <TextField id="behalf-guests" label="Người mỗi bàn" defaultValue="10" />
        <TextField id="behalf-setup" label="Bàn bố trí" defaultValue="8" />
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
