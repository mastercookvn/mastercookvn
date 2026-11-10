import { CheckIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";

export function OrderSentState() {
  return (
    <EmptyState>
      <CheckIcon size={52} />
      <h2 className="h2-section">Đã gửi đơn DH-0142!</h2>
      <p className="text-soft max-w-[52ch]">
        Tư vấn sẽ liên hệ qua điện thoại hoặc Zalo để khảo sát địa điểm từng
        bữa. Bạn theo dõi đơn trong Hồ sơ của tôi.
      </p>
      <ButtonLink href={ROUTES.account} variant="primary">
        Xem đơn của tôi
      </ButtonLink>
    </EmptyState>
  );
}
