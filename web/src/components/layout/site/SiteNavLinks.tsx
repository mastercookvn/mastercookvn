"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { ROUTES } from "@/constants/routes";

const LINKS = [
  { href: ROUTES.home, label: "Trang chủ" },
  { href: ROUTES.menu, label: "Thực đơn" },
  { href: ROUTES.services, label: "Dịch vụ, chính sách" },
  { href: ROUTES.booking, label: "Tính giá, đặt tiệc" },
];

function NavList({ pathname }: { pathname?: string }) {
  return (
    <div className="nav-menu">
      {LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="nav-link"
          aria-current={pathname === href ? "page" : undefined}
        >
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
