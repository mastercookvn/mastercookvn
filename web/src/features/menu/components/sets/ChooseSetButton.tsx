"use client";

import { useRouter } from "next/navigation";

import { ArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { selectEstimateSet } from "@/mocks/demoStore";

export function ChooseSetButton({ setId }: { setId: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        selectEstimateSet(setId);
        router.push(ROUTES.booking);
      }}
    >
      Tính giá với set này <ArrowIcon size={16} className="btn-arrow" />
    </Button>
  );
}
