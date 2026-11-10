"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import type { WorkTask } from "@/features/dashboard/lib/workTasks";

import { WorkQueueTable } from "./WorkQueueTable";

/** The home page shows the most urgent few; the rest are one click away. */
const VISIBLE_TASKS = 5;

export function TaskQueue({
  tasks,
  showGroup,
}: {
  tasks: WorkTask[];
  showGroup: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
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
