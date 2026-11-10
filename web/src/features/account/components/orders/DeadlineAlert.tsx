import { ClockIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { CONTRACT_WEDDING } from "@/mocks/contracts";

export function DeadlineAlert() {
  return (
    <Alert tone="wait">
      <ClockIcon size={18} />
      <span>
        Hợp đồng {CONTRACT_WEDDING.number} cần xác nhận và cọc trước{" "}
        <b>{CONTRACT_WEDDING.depositDeadline}</b>.
      </span>
    </Alert>
  );
}
