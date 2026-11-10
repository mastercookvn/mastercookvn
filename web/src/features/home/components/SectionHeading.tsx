import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="block-head">
      <div>
        <Reveal as="span" variant="fade" className="eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" variant="up" className="h2-section">
          {title}
        </Reveal>
      </div>
      {action}
    </div>
  );
}
