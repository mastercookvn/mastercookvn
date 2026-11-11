"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROLE } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { ORDER_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";

import type { WorkTask } from "@/features/dashboard/lib/workTasks";

import { WorkQueueTable } from "./WorkQueueTable";

/** The home page shows the most urgent few; the rest are one click away. */
const VISIBLE_TASKS = 5;

export function TaskQueue({
  tasks: fixedTasks,
  showGroup,
  showNewOrders,
}: {
  tasks: WorkTask[];
  showGroup: boolean;
  /** Consultants see orders customers just sent (UC-DT-02 step 6). */
  showNewOrders: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const submitted = useDemoState((state) => state.submittedOrders);
  const decided = useDemoState((state) => state.orderStatuses);
  const newOrders: WorkTask[] = showNewOrders
    ? submitted
        .filter((order) => !decided[order.code])
        .map((order) => ({
          role: ROLE.Consultant,
          title: `Khảo sát và nhận đơn ${order.code} (${order.meals.length} bữa)`,
          subject: order.contact?.name ?? "",
          due: "Hôm nay",
          status: <StatusBadge domain="order" status={ORDER_STATUS.Pending} />,
          href: ROUTES.workspaceOrder(order.code),
        }))
    : [];
  const tasks = [...newOrders, ...fixedTasks];
  const hidden = tasks.length - VISIBLE_TASKS;

  return (
    <div className="l-stack gap-2">
      <WorkQueueTable
        tasks={expanded ? tasks : tasks.slice(0, VISIBLE_TASKS)}
        showGroup={showGroup}
      />
      {hidden > 0 ? (
        <Button
          size="sm"
          className="self-start"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Thu gọn" : `Xem thêm ${hidden} việc`}
        </Button>
      ) : null}
    </div>
  );
}
