import { Alert } from "@/components/ui/Alert";
import { TextField } from "@/components/ui/TextField";

export function CustomerLookupForm() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Hồ sơ khách</h3>
      <div className="l-grid l-grid-2">
        <TextField
          id="behalf-phone"
          label="Số điện thoại"
          type="tel"
          defaultValue="0978 222 333"
        />
        <TextField
          id="behalf-name"
          label="Họ tên"
          defaultValue="Nguyễn Minh Đức"
        />
      </div>
      <Alert tone="wait">
        SĐT này đã thuộc hồ sơ &quot;Nguyễn Minh Đức&quot;. Kiểm tra đúng người
        trước khi dùng, hệ thống không tạo hồ sơ thứ hai.
      </Alert>
    </section>
  );
}
