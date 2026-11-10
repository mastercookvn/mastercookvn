"use client";

import { Badge } from "@/components/ui/Badge";

import { useCustomerNotices } from "../../lib/useCustomerNotices";

export function CustomerNoticeCount() {
  const count = useCustomerNotices().length;
  if (count === 0) return null;

  return (
    <Badge tone="wait">
      <span className="sr-only">Có </span>
      {count}
      <span className="sr-only"> việc cần làm</span>
    </Badge>
  );
}
