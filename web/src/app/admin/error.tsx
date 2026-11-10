"use client";

import { useEffect } from "react";

import { WarningIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function WorkspaceError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState>
      <WarningIcon size={28} />
      <h1 className="h1-compact text-15">Đã có lỗi xảy ra</h1>
      <p className="text-soft">Bạn vui lòng thử lại sau ít phút.</p>
      <Button variant="primary" onClick={retry}>
        Thử lại
      </Button>
    </EmptyState>
  );
}
