"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ROUTES } from "@/constants/routes";

export type WorkspaceNavGroup = {
  label: string;
  items: { href: string; label: string; icon: ReactNode }[];
};

function isCurrent(pathname: string, href: string) {
  return href === ROUTES.workspace
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function WorkspaceNavLinks({ groups }: { groups: WorkspaceNavGroup[] }) {
  const pathname = usePathname();
  const closeDrawer = () =>
    document.getElementById("workspace-sidebar")?.classList.remove("is-open");

  return groups.map((group) => (
    <div key={group.label} className="contents">
      <div className="workspace-nav-group">{group.label}</div>
      {group.items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="workspace-nav-link"
          aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          onClick={closeDrawer}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  ));
}
