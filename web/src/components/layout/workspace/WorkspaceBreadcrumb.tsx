"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";

const SECTIONS: { href: string; label: string; detail?: string }[] = [
  {
    href: ROUTES.workspaceOrders,
    label: "Đơn đặt tiệc",
    detail: "Chi tiết đơn",
  },
  {
    href: ROUTES.workspaceContracts,
    label: "Hợp đồng",
    detail: "Chi tiết hợp đồng",
  },
  { href: ROUTES.workspaceMeals, label: "Vận hành bữa" },
  { href: ROUTES.workspaceStaff, label: "Nhân sự" },
  { href: ROUTES.workspaceIngredients, label: "Nguyên liệu" },
  { href: ROUTES.workspaceEquipment, label: "Dụng cụ" },
  { href: ROUTES.workspaceCatalog, label: "Thực đơn và dịch vụ" },
  { href: ROUTES.workspaceReports, label: "Báo cáo" },
  { href: ROUTES.workspaceSettings, label: "Cài đặt" },
];

export function WorkspaceBreadcrumb() {
  const pathname = usePathname();
  const section = SECTIONS.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );

  if (!section) return <b>Tổng quan</b>;

  return section.detail && pathname !== section.href ? (
    <>
      <Link href={section.href}>{section.label}</Link>
      <span>/</span>
      <b>{section.detail}</b>
    </>
  ) : (
    <b>{section.label}</b>
  );
}
