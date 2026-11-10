import { Alert } from "@/components/ui/Alert";
import { QrPlaceholder } from "@/components/ui/QrPlaceholder";

export function QrPaymentCard({ percent }: { percent: number }) {
  return (
    <>
      <QrPlaceholder seed={`HD0142${percent}`} />
      <div className="l-stack gap-0.5">
        <span className="text-code">Mã tham chiếu GD-0142-{percent}</span>
        <span className="text-small text-soft">
          Quét bằng ứng dụng ngân hàng. Mã QR này chỉ minh họa, chưa chốt nhà
          cung cấp.
        </span>
      </div>
      <Alert tone="info" className="w-full text-left">
        Trang tự cập nhật khi nhận kết quả từ dịch vụ thanh toán, không cần bấm
        báo đã trả.
      </Alert>
    </>
  );
}
