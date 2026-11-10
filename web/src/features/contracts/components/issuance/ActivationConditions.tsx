"use client";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

export function ActivationConditions({ roles }: { roles: Role[] }) {
  const paperSigned = useDemoState((state) => state.paperSigned);
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);
  const signature = useDemoState((state) => state.contractSignature);

  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Điều kiện hiệu lực</h3>
      <MoneyRow
        label="Khách xác nhận"
        value={
          paperSigned ? (
            <Badge tone="good">Ký giấy</Badge>
          ) : confirmed ? (
            <Badge tone="good">Ký online</Badge>
          ) : (
            <Badge tone="wait">Chưa</Badge>
          )
        }
      />
      {signature ? (
        <figure className="l-stack gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL from the signature pad */}
          <img
            className="signature-image"
            src={signature.image}
            alt={`Chữ ký của ${signature.name}`}
          />
          <figcaption className="text-small text-soft">
            {signature.name} ký lúc {signature.signedAt}
          </figcaption>
        </figure>
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
