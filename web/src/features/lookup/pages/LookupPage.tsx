import { Reveal } from "@/components/motion/Reveal";

import { OrderLookupForm } from "../components/OrderLookupForm";

export function LookupPage() {
  return (
    <div className="page">
      <div className="l-stack gap-1.5">
        <Reveal as="h1" variant="up" immediate className="h1-page">
          Tra cứu đơn và hợp đồng
        </Reveal>
        <p className="text-soft">
          Nhập số điện thoại đã đặt tiệc và mã đơn (DH-…) hoặc số hợp đồng
          (HD-…) để xem tình trạng.
        </p>
      </div>
      <OrderLookupForm />
    </div>
  );
}
