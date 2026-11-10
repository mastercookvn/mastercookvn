import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";

export function OrderSentState() {
  return (
    <section className="order-sent" aria-live="polite">
      <div className="order-sent-stage" aria-hidden="true">
        <span className="order-sent-glow" />
        <Mascot mood="happy" size={180} className="order-sent-mascot" />
      </div>
      <h2 className="order-sent-title">Đặt tiệc thành công!</h2>
      <p className="order-sent-text">
        Cảm ơn bạn đã tin MasterCook. Tư vấn sẽ gọi điện hoặc nhắn Zalo trong
        hôm nay để hẹn khảo sát địa điểm từng bữa.
      </p>
      <div className="l-row justify-center gap-2">
        <ButtonLink href={ROUTES.account} variant="primary">
          Theo dõi đơn của tôi
        </ButtonLink>
        <ButtonLink href={ROUTES.home}>Về trang chủ</ButtonLink>
      </div>
    </section>
  );
}
