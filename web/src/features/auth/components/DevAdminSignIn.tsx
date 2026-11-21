"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { signInAsDevAdmin } from "@/features/auth/actions";
import { DEV_ADMIN_ACCOUNT } from "@/features/auth/devAccount";

export function DevAdminSignIn() {
  const next = useSearchParams().get("next");

  return (
    <form action={signInAsDevAdmin} className="dev-account">
      <p className="text-small font-semibold">
        Tài khoản phát triển: {DEV_ADMIN_ACCOUNT.phone}
      </p>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <Button type="submit" size="sm" variant="primary" className="w-full">
        Vào trang quản lý
      </Button>
    </form>
  );
}
