"use client";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export function ActivationConditions({ roles }: { roles: Role[] }) {
  const paperSigned = useDemoState((state) => state.paperSigned);
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);

  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Điều kiện hiệu lực</h3>
      <MoneyRow
        label="Khách xác nhận"
        value={
          paperSigned ? (
            <Badge tone="good">Ký giấy</Badge>
          ) : confirmed ? (
            <Badge tone="good">Online</Badge>
          ) : (
            <Badge tone="wait">Chưa</Badge>
          )
        }
      />
      <MoneyRow
        label={`Cọc bắt buộc ${formatMoney(contract.total * 0.5)}`}
        value={
          deposited ? (
            <Badge tone="good">Đủ</Badge>
          ) : (
            <Badge tone="wait">Chưa</Badge>
          )
        }
      />
      {hasAnyRole(roles, [ROLE.Accountant]) ? (
        <ButtonLink href="?tab=payment">Ghi nhận thu tiền</ButtonLink>
      ) : null}
      {hasAnyRole(roles, [ROLE.Consultant]) ? (
        <ButtonLink href="?tab=cancel">Hủy bữa hoặc hợp đồng</ButtonLink>
      ) : null}
    </aside>
  );
}
