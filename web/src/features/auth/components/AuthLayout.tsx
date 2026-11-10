import type { ReactNode } from "react";

import { MaskImage } from "@/components/motion/MaskImage";
import { Reveal } from "@/components/motion/Reveal";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth">
      <div className="auth-media">
        <MaskImage
          src="/images/scenes/auth.jpg"
          alt=""
          sizes="(max-width: 760px) 100vw, 520px"
        />
        <Reveal as="h2" variant="up" delayMs={400}>
          Chào mừng bạn
        </Reveal>
        <Reveal as="p" variant="up" delayMs={520}>
          Nhân viên dùng chung trang này và được chuyển tới trang quản lý.
        </Reveal>
      </div>
      <div className="auth-form">{children}</div>
    </div>
  );
}
