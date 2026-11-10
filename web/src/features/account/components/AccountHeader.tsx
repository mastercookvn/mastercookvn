import { Reveal } from "@/components/motion/Reveal";

export function AccountHeader({
  customer,
}: {
  customer: { name: string; phone: string };
}) {
  return (
    <div className="l-stack gap-1">
      <Reveal as="h1" variant="up" immediate className="h1-page">
        Hồ sơ của tôi
      </Reveal>
      <p className="text-soft">
        {customer.name} · {customer.phone}
      </p>
    </div>
  );
}
