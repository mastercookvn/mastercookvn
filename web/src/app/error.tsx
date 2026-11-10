"use client";

import { useEffect } from "react";

import { WarningIcon } from "@/components/icons";

export default function Error({
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
    <main className="page min-h-screen justify-center">
      <div className="card empty-state">
        <WarningIcon size={44} />
        <h1 className="h2-section">Đã có lỗi xảy ra</h1>
        <p className="text-soft">Bạn vui lòng thử lại sau ít phút.</p>
        <button type="button" onClick={retry} className="btn btn-primary">
          Thử lại
        </button>
      </div>
    </main>
  );
}
