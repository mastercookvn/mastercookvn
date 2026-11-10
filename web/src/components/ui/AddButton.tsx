import type { ComponentProps } from "react";

import { PlusIcon } from "@/components/icons";

import { Button } from "./Button";

/** The one style for "Thêm ..." / "Tạo ...", always last in a section header. */
export function AddButton({
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, "variant">) {
  return (
    <Button variant="primary" {...props}>
      <PlusIcon size={18} />
      {children}
    </Button>
  );
}
