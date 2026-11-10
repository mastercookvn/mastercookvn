"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";

export function SubmitButton({
  children,
  name,
  value,
}: {
  children: string;
  name?: string;
  value?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      name={name}
      value={value}
      disabled={pending}
    >
      {children}
    </Button>
  );
}
