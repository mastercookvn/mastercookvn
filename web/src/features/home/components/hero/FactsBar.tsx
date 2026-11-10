import { Reveal } from "@/components/motion/Reveal";
import { BUSINESS_SETTINGS } from "@/constants/settings";

const FACTS = [
  ["Từ 10 người", "Mỗi bàn ăn"],
  ["Từ 6 món", "Tự chọn thực đơn"],
  ["Nhiều bữa", "Trong một hợp đồng"],
  [
    `Cọc từ ${BUSINESS_SETTINGS.minimumDepositRate * 100}%`,
    `Giữ chỗ trong ${BUSINESS_SETTINGS.holdHours} giờ`,
  ],
  [`Trong ${BUSINESS_SETTINGS.serviceRadiusKm} km`, "Tính từ cơ sở"],
];

export function FactsBar() {
  return (
    <section className="facts">
      <div className="facts-inner">
        {FACTS.map(([value, label], index) => (
          <Reveal
            key={value}
            variant="up"
            immediate
            delayMs={1100 + index * 80}
            className="fact"
          >
            <b>{value}</b>
            <span>{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
