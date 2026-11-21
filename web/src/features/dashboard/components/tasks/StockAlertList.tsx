"use client";

import Link from "next/link";

import { WarningIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { useDemoState } from "@/lib/demoStore";

/** One line on the home page; details live on the equipment screen. */
export function StockAlertList() {
  const equipment = useDemoState((state) => state.equipment);
  const lowStock = equipment.filter((item) => item.ready < item.minimum);

  if (!lowStock.length) return null;

  return (
    <Link
      href={`${ROUTES.workspaceEquipment}?tab=purchase`}
      className="stock-alert"
    >
      <WarningIcon size={18} />
      <span>
        <b>{lowStock.length} dụng cụ dưới tồn tối thiểu</b>
        <small>{lowStock.map((item) => item.name).join(", ")}</small>
      </span>
    </Link>
  );
}
