"use client";

import Link from "next/link";

import { ClockIcon, CoinIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { buttonVariants } from "@/components/ui/buttonVariants";

import { useCustomerNotices } from "../../lib/useCustomerNotices";

export function CustomerNotices() {
  const notices = useCustomerNotices();
  if (notices.length === 0) return null;

  return (
    <div className="l-stack gap-2" aria-label="Thông báo" role="region">
      {notices.map((notice) => (
        <Alert key={notice.id} tone={notice.tone} className="l-between">
          <span className="l-row flex-nowrap gap-2">
            {notice.tone === "wait" ? (
              <ClockIcon size={18} />
            ) : (
              <CoinIcon size={18} />
            )}
            <span>{notice.message}</span>
          </span>
          <Link
            href={notice.href}
            className={buttonVariants({ size: "sm", variant: "primary" })}
          >
            {notice.actionLabel}
          </Link>
        </Alert>
      ))}
    </div>
  );
}
