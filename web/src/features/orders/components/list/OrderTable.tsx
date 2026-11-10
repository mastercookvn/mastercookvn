import { DataTable, num } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/constants/routes";
import { formatMoney } from "@/lib/format";
import type { OrderRow } from "@/mocks/orders";

export function OrderTable({ orders }: { orders: OrderRow[] }) {
  return (
    <DataTable
      columns={[
        "Mã đơn",
        "Khách",
        "SĐT",
        num("Bữa"),
        "Ngày tiệc đầu",
        "Kênh",
        num("Tổng"),
        "Trạng thái",
      ]}
      rows={orders.map((order) => [
        <span key="code" className="font-semibold">
          {order.code}
        </span>,
        order.customer,
        <span key="phone" className="text-soft">
          {order.phone}
        </span>,
        order.meals,
        order.firstDate,
        <span key="channel" className="text-soft">
          {order.channel}
        </span>,
        formatMoney(order.total),
        <StatusBadge key="status" domain="order" status={order.status} />,
      ])}
      rowActions={orders.map((order) =>
        order.code === "DH-0142"
          ? { href: ROUTES.workspaceOrder(order.code) }
          : { toast: "Bản mẫu chỉ mở chi tiết đơn DH-0142" },
      )}
    />
  );
}
