"use client";

import type { ComponentProps } from "react";

import { Button } from "./Button";
import { useToast } from "./Toast";

/** Confirmation only until the action has an API. */
export function ToastButton({
  message,
  ...props
}: Omit<ComponentProps<typeof Button>, "onClick"> & { message: string }) {
  const showToast = useToast();
  return <Button onClick={() => showToast(message)} {...props} />;
}
