import { Reveal } from "@/components/motion/Reveal";

export function MenuHeader() {
  return (
    <div className="l-stack gap-1.5">
      <span className="eyebrow">Thực đơn</span>
      <Reveal as="h1" variant="up" immediate className="h1-page">
        Món ngon cho bàn tiệc của bạn
      </Reveal>
      <p className="text-soft">
        Giá cho một bàn ăn chuẩn 10 người. Bàn đông hơn được nhân theo hệ số quy
        mô khi tính giá.
      </p>
    </div>
  );
}
