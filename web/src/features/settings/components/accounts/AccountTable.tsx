import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ROLE_LABEL } from "@/constants/roles";
import { STAFF_ACCOUNTS } from "@/mocks/people";

import { AccountFormDialog } from "./AccountFormDialog";
import { ResetPasswordButton } from "./ResetPasswordButton";

export function AccountTable() {
  return (
    <>
      <PanelHeader
        title="Tài khoản và phân quyền"
        subtitle="Một tài khoản có thể kiêm nhiều vai trò. Quyền là hợp các vai trò."
        actions={<AccountFormDialog />}
      />
      <DataTable
        columns={["Họ tên", "SĐT", "Vai trò", "Trạng thái", ""]}
        rows={STAFF_ACCOUNTS.map((account) => [
          account.name,
          account.phone,
          <div key="roles" className="l-row gap-1">
            {account.roles.map((role) => (
              <span key={role} className="role-chip">
                {ROLE_LABEL[role]}
              </span>
            ))}
          </div>,
          account.active ? (
            <Badge key="status" tone="good">
              Hoạt động
            </Badge>
          ) : (
            <Badge key="status" tone="error">
              Đã khóa
            </Badge>
          ),
          <div key="actions" className="l-row flex-nowrap gap-1">
            <Button size="sm">Sửa</Button>
            <ResetPasswordButton />
            <Button size="sm">{account.active ? "Khóa" : "Mở khóa"}</Button>
          </div>,
        ])}
      />
      <p className="text-small text-soft">
        Không thể gỡ vai trò Quản lý cơ sở của tài khoản quản lý cuối cùng.
      </p>
    </>
  );
}
