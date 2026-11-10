"use client";

import { ClockIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { useDemoState } from "@/mocks/demoStore";
import type { Contract } from "@/mocks/contracts";

import { isAwaitingContract } from "@/features/contracts/lib/contractState";

/** Display only. The server enforces the deadline. */
export function CountdownBanner({ contract }: { contract: Contract }) {
  const active = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed,
  );
  if (!isAwaitingContract(contract)) return null;

  if (active) {
    return (
      <Alert tone="good">
        Hợp đồng đã có hiệu lực. Cơ sở giữ chỗ chính thức cho hai bữa.
      </Alert>
    );
  }

  return (
    <Alert tone="wait">
      <ClockIcon size={18} />
      <span>
        Còn <span className="countdown">23 giờ 30 phút</span> để hoàn tất. Quá
        hạn thì chỗ được nhả và khoản đã thu được hoàn lại.
      </span>
    </Alert>
  );
}
