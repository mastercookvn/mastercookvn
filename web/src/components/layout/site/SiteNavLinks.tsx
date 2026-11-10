"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import {
  BookIcon,
  CalculatorIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";
import { ROUTES } from "@/constants/routes";

const ICON_SIZE = 17;

const LINKS = [
  { href: ROUTES.home, label: "Trang chủ", icon: HomeIcon },
  { href: ROUTES.menu, label: "Thực đơn", icon: MenuIcon },
  { href: ROUTES.services, label: "Dịch vụ, chính sách", icon: BookIcon },
  { href: ROUTES.booking, label: "Tính giá, đặt tiệc", icon: CalculatorIcon },
  { href: ROUTES.lookup, label: "Tra cứu đơn", icon: SearchIcon },
];

function NavList({ pathname }: { pathname?: string }) {
  return (
    <div className="nav-menu">
      {LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="nav-link"
          aria-current={pathname === href ? "page" : undefined}
        >
          <Icon size={ICON_SIZE} />
          {label}
        </Link>
      ))}
    </div>
  );
}

function CurrentNavList() {
  return <NavList pathname={usePathname()} />;
}

export function SiteNavLinks() {
  return (
    <Suspense fallback={<NavList />}>
      <CurrentNavList />
    </Suspense>
  );
}
