"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Badge } from "@/components/ui/Badge";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { DataTable } from "@/components/ui/DataTable";
import { Drawer } from "@/components/ui/Drawer";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { RowMenu } from "@/components/ui/RowMenu";
import { useToast } from "@/components/ui/Toast";
import { ROLE, ROLE_LABEL } from "@/constants/roles";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { STAFF_ACCOUNTS, type StaffAccount } from "@/mocks/people";

import { AccountEditForm } from "./AccountEditForm";
import { AccountForm } from "./AccountForm";

const FORM_ID = "account-form";
const NEW_ACCOUNT = "new";

export function AccountTable() {
  const showToast = useToast();
  const accounts = useDemoState((state) => state.staffAccounts);
  const [editingPhone, setEditingPhone] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const editing =
    accounts.find((account) => account.phone === editingPhone) ?? null;

  /** Spec: the last active branch manager can never lose access. */
  const isLastManager = (account: StaffAccount) =>
    account.active &&
    account.roles.includes(ROLE.BranchManager) &&
    accounts.filter(
      (other) => other.active && other.roles.includes(ROLE.BranchManager)
    ).length === 1;

  const isSample = (account: StaffAccount) =>
    STAFF_ACCOUNTS.some((sample) => sample.phone === account.phone);

  const setActive = (account: StaffAccount, active: boolean) => {
    updateDemoState({
      staffAccounts: readDemoState().staffAccounts.map((other) =>
        other.phone === account.phone ? { ...other, active } : other
      ),
    });
    showToast(
      active
        ? `Đã mở khóa ${account.name}`
        : `Đã khóa ${account.name}, không đăng nhập được nữa`
    );
  };

  return (
    <>
      <PanelHeader
        title="Tài khoản và phân quyền"
        count={accounts.length}
        actions={
          <AddButton onClick={() => setEditingPhone(NEW_ACCOUNT)}>
            Thêm tài khoản
          </AddButton>
        }
      />
      <DataTable
        searchPlaceholder="Tìm theo tên, SĐT, vai trò"
        columns={["Họ tên", "SĐT", "Vai trò", "Trạng thái", ""]}
        rowActions={accounts.map((account) => ({
          onSelect: () => setEditingPhone(account.phone),
          selected: account.phone === editingPhone,
        }))}
        rows={accounts.map((account) => [
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
          <RowMenu
            key="actions"
            label={`Thao tác với ${account.name}`}
            items={[
              {
                label: "Sửa tên, vai trò",
                onSelect: () => setEditingPhone(account.phone),
              },
              {
                label: "Đặt lại mật khẩu",
                onSelect: () =>
                  showToast(
                    `Đã đặt mật khẩu tạm cho ${account.name}. Báo nhân viên ngoài hệ thống.`
                  ),
              },
              {
                label: account.active
                  ? isLastManager(account)
                    ? "Khóa (quản lý cuối cùng)"
                    : "Khóa tài khoản"
                  : "Mở khóa",
                disabled: account.active && isLastManager(account),
                onSelect: () => setActive(account, !account.active),
              },
              {
                label: isSample(account)
                  ? "Xóa (đã có lịch sử, hãy khóa)"
                  : "Xóa tài khoản",
                danger: true,
                disabled: isSample(account) || isLastManager(account),
                onSelect: () =>
                  setDeleting({
                    name: account.name,
                    onConfirm: () => {
                      updateDemoState({
                        staffAccounts: readDemoState().staffAccounts.filter(
                          (other) => other.phone !== account.phone
                        ),
                      });
                      showToast(`Đã xóa tài khoản ${account.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <p className="text-small text-soft">
        Không thể gỡ vai trò Quản lý cơ sở hoặc khóa quản lý cuối cùng.
      </p>
      <ConfirmDelete
        target={deleting}
        kind="tài khoản"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingPhone !== null}
        onOpenChange={(open) => {
          if (!open) setEditingPhone(null);
        }}
        title={
          editing ? `Sửa tài khoản: ${editing.name}` : "Thêm tài khoản nội bộ"
        }
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Lưu tài khoản"}
      >
        {editingPhone === null ? null : editing ? (
          <AccountEditForm
            key={editing.phone}
            formId={FORM_ID}
            account={editing}
            onSaved={() => setEditingPhone(null)}
          />
        ) : (
          <AccountForm formId={FORM_ID} onSaved={() => setEditingPhone(null)} />
        )}
      </Drawer>
    </>
  );
}
