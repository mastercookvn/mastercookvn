"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { signInWithSampleAccount } from "@/features/auth/actions";
import { SAMPLE_ACCOUNTS } from "@/mocks/people";

export function SampleAccountList() {
  const next = useSearchParams().get("next");

  return (
    <div className="sample-accounts">
      <p className="text-small font-semibold">Vào nhanh bằng tài khoản mẫu</p>
      <div className="sample-accounts-grid">
        {SAMPLE_ACCOUNTS.map((account, index) => (
          <form key={account.phone} action={signInWithSampleAccount}>
            <input type="hidden" name="phone" value={account.phone} />
            {next ? <input type="hidden" name="next" value={next} /> : null}
            <Button
              type="submit"
              size="sm"
              variant={index === 0 ? "primary" : "default"}
              className="w-full"
            >
              {account.label}
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
