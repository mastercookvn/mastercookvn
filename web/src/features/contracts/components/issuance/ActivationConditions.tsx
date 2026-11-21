"use client";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { formatMoney } from "@/lib/format";
import type { Contract } from "@/models/contracts";
import { useDemoState } from "@/lib/demoStore";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

export function ActivationConditions({
  roles,
  contract,
}: {
  roles: Role[];
  contract: Contract;
}) {
  const paperSigned = useDemoState((state) => state.paperSigned);
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);
  const confirmation = useDemoState((state) => state.contractConfirmation);

  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Điều kiện hiệu lực</h3>
      <MoneyRow
        label="Khách xác nhận"
        value={
          paperSigned ? (
            <Badge tone="good">Ký giấy</Badge>
          ) : confirmed ? (
            <Badge tone="good">Xác nhận online</Badge>
          ) : (
            <Badge tone="wait">Chưa</Badge>
          )
        }
      />
      {confirmation && !paperSigned ? (
        <p className="text-small text-soft">
          Tài khoản {confirmation.accountName} ({confirmation.accountPhone})
          đồng ý phiên bản {confirmation.version} lúc {confirmation.confirmedAt}
        </p>
      ) : null}
      <MoneyRow
        label={`${MINIMUM_DEPOSIT_LABEL}: ${formatMoney(minimumDeposit(contract))}`}
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
