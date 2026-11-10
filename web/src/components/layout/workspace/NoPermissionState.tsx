import { LockIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROLE_LABEL, type Role } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export function NoPermissionState({ roles }: { roles: Role[] }) {
  return (
    <EmptyState>
      <LockIcon size={28} />
      <h1 className="h1-compact text-18">Bạn chưa có quyền xem mục này</h1>
      <p className="text-soft">
        Tài khoản đang có vai trò:{" "}
        {roles.map((role) => ROLE_LABEL[role]).join(", ")}. Liên hệ Quản lý cơ
        sở nếu cần thêm quyền.
      </p>
      <ButtonLink href={ROUTES.workspace} variant="primary" className="mt-1.5">
        Về tổng quan
      </ButtonLink>
    </EmptyState>
  );
}
