import { Reveal } from "@/components/motion/Reveal";

import { SectionHeading } from "@/features/home/components/SectionHeading";

const STEPS = [
  ["Chọn món, tính giá", "Biết chi phí dự kiến của từng bữa ngay lập tức."],
  [
    "Gửi đơn, được khảo sát",
    "Tư vấn gọi hỏi địa điểm, khu vực đặt bàn và lối xe vào.",
  ],
  [
    "Xác nhận và đặt cọc",
    "Xác nhận online hoặc ký tại quầy, cọc trong 24 giờ.",
  ],
  [
    "Đón khách",
    "Chúng tôi mang món đã nấu sẵn đến, phục vụ và thu dọn dụng cụ.",
  ],
];

export function BookingSteps() {
  return (
    <section className="band bg-blue-50">
      <div className="block-inner">
        <SectionHeading
          eyebrow="Đặt tiệc"
          title="Bốn bước để có một bữa tiệc"
        />
        <div className="steps">
          {STEPS.map(([title, description], index) => (
            <Reveal
              key={title}
              variant="up"
              delayMs={index * 100}
              className="step"
            >
              <i>{index + 1}</i>
              <b>{title}</b>
              <span className="text-soft text-small">{description}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
