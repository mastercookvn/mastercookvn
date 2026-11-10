import Link from "next/link";

import { WarningIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";

const LOW_STOCK = [
  { name: "Khay inox", ready: 18, minimum: 30 },
  { name: "Ly thủy tinh", ready: 268, minimum: 300 },
];

/** One line on the home page; details live on the equipment screen. */
export function StockAlertList() {
  return (
    <Link
      href={`${ROUTES.workspaceEquipment}?tab=purchase`}
      className="stock-alert"
    >
      <WarningIcon size={18} />
      <span>
        <b>{LOW_STOCK.length} dụng cụ dưới tồn tối thiểu</b>
        <small>{LOW_STOCK.map((item) => item.name).join(", ")}</small>
      </span>
    </Link>
  );
}
