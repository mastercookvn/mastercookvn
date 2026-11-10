import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { ContractTable } from "../components/list/ContractTable";
import { ReceivableQueueTable } from "../components/queues/ReceivableQueueTable";
import { RefundQueueTable } from "../components/queues/RefundQueueTable";

export function ContractListPage() {
  return (
    <WorkspaceTabs
      screen="contracts"
      panels={{
        list: <ContractTable />,
        receivables: <ReceivableQueueTable />,
        refunds: <RefundQueueTable />,
      }}
    />
  );
}
