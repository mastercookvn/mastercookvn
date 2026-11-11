import type { ReactNode } from "react";

import {
  ClipboardIcon,
  LockIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/icons";
import { MaskImage } from "@/components/motion/MaskImage";
import { MEDIA_FOLDER, mediaKey } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth">
      <div className="auth-media">
        <MaskImage
          imageKey={mediaKey(MEDIA_FOLDER.Scenes, "auth.jpg")}
          alt=""
          sizes="(max-width: 760px) 100vw, 520px"
        />
        <Reveal as="h2" variant="up" delayMs={400}>
          Chào mừng bạn
        </Reveal>
        <Reveal as="div" variant="up" delayMs={520}>
          <ol className="auth-flow">
            <li>
              <PhoneIcon size={18} />
              Số điện thoại là tên đăng nhập, mỗi số một người.
            </li>
            <li>
              <ShieldIcon size={18} />
              Tài khoản mới xác thực số qua mã SMS trước khi dùng.
            </li>
            <li>
              <LockIcon size={18} />
              Quên mật khẩu thì xác thực lại số bằng mã SMS để đặt mật khẩu mới.
            </li>
            <li>
              <ClipboardIcon size={18} />
              Đơn nhân viên đặt hộ bằng cùng số sẽ tự hiện trong tài khoản.
            </li>
          </ol>
        </Reveal>
        <Reveal as="p" variant="up" delayMs={640}>
          Nhân viên dùng chung trang này và được chuyển tới trang quản lý.
        </Reveal>
      </div>
      <div className="auth-form">{children}</div>
    </div>
  );
}
