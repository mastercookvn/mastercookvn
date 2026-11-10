import { TextField } from "@/components/ui/TextField";

export function SurchargeForm() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Phụ thu thỏa thuận</h3>
      <div className="l-grid l-grid-2">
        <TextField id="surcharge-1" label="Bữa 1" defaultValue="0" />
        <TextField id="surcharge-2" label="Bữa 2" defaultValue="0" />
      </div>
      <p className="text-small text-soft">
        Sau khi phát hành, tên, lượng, đơn giá, thuế, phụ thu và giá bồi thường
        được chốt và không đổi theo danh mục.
      </p>
    </section>
  );
}
