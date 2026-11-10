import { Reveal } from "@/components/motion/Reveal";

export function ServicesHeader() {
  return (
    <div className="l-stack gap-1.5">
      <Reveal as="h1" variant="up" immediate className="h1-page">
        Dịch vụ và chính sách
      </Reveal>
      <p className="text-soft">
        Mọi đơn giá và điều khoản được chốt trong hợp đồng trước khi bạn xác
        nhận.
      </p>
    </div>
  );
}
