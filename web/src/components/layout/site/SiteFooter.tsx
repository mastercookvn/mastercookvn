import Link from "next/link";

import { ClockIcon, LockIcon, PhoneIcon } from "@/components/icons";
import { Logo } from "@/components/brand/Logo";
import { ROUTES } from "@/constants/routes";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="l-stack gap-1.5">
          <Logo tone="dark" size={34} />
          <span>
            Tiệc nấu sẵn tại bếp, giao và phục vụ tại địa điểm của bạn, trong
            phạm vi {BUSINESS_SETTINGS.serviceRadiusKm} km.
          </span>
        </div>
        <div className="l-stack gap-1">
          <b>Liên hệ tư vấn</b>
          <span>
            <PhoneIcon size={17} /> Điện thoại, Zalo: {siteConfig.phone} (số
            minh họa)
          </span>
        </div>
        <div className="l-stack gap-1">
          <b>Giờ làm việc</b>
          <span>
            <ClockIcon size={17} /> Theo giờ Việt Nam (minh họa)
          </span>
        </div>
        <div className="l-stack gap-1">
          <b>Nhân viên</b>
          <Link
            href={`${ROUTES.login}?next=${ROUTES.workspace}`}
            className="underline"
          >
            <LockIcon size={17} /> Đăng nhập trang quản lý
          </Link>
        </div>
      </div>
    </footer>
  );
}
