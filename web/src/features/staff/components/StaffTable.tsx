"use client";

import Image from "next/image";
import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Badge } from "@/components/ui/Badge";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { RowMenu } from "@/components/ui/RowMenu";
import { useToast } from "@/components/ui/Toast";
import { STAFF, type StaffMember } from "@/mocks/people";
import { DataTable } from "@/components/ui/DataTable";
import { Drawer, DRAWER_SIZE } from "@/components/ui/Drawer";
import { PanelHeader } from "@/components/ui/PanelHeader";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import { StaffForm } from "./StaffForm";

const FORM_ID = "staff-form";
const NEW_STAFF = "new";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(-2)
    .map((word) => word[0])
    .join("");

/** Sample staff have past assignments, so they are deactivated instead. */
const hasHistory = (member: StaffMember) =>
  STAFF.some((sample) => sample.phone === member.phone);

export function StaffTable() {
  const showToast = useToast();
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const staff = useDemoState((state) => state.staff);

  const setActive = (member: StaffMember, active: boolean) => {
    updateDemoState({
      staff: readDemoState().staff.map((other) =>
        other.phone === member.phone ? { ...other, active } : other
      ),
    });
    showToast(
      active
        ? `${member.name} đi làm lại, chọn được khi phân công`
        : `${member.name} ngưng làm, không nhận việc mới`
    );
  };
  const [editingPhone, setEditingPhone] = useState<string | null>(null);
  const editing = staff.find((member) => member.phone === editingPhone) ?? null;

  return (
    <>
      <PanelHeader
        title="Hồ sơ nhân sự"
        count={staff.length}
        actions={
          <AddButton onClick={() => setEditingPhone(NEW_STAFF)}>
            Thêm nhân viên
          </AddButton>
        }
      />
      <DataTable
        searchPlaceholder="Tìm theo tên, SĐT, vị trí, kỹ năng"
        columns={[
          "Nhân viên",
          "Vị trí",
          "Loại",
          "Ngày vào làm",
          "Kỹ năng",
          "Trạng thái",
          "",
        ]}
        rowActions={staff.map((member) => ({
          onSelect: () => setEditingPhone(member.phone),
          selected: member.phone === editingPhone,
        }))}
        rows={staff.map((member) => [
          <span key="name" className="person-cell">
            <span className="avatar">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                initials(member.name)
              )}
            </span>
            <span className="l-stack gap-0">
              <b>{member.name}</b>
              <small className="text-soft">{member.phone}</small>
            </span>
          </span>,
          member.position,
          member.type,
          member.startDate || "Chưa ghi",
          <span key="skills" className="text-small text-soft">
            {member.skills?.length ? member.skills.join(", ") : "Chưa ghi"}
          </span>,
          member.active ? (
            <Badge key="status" tone="good">
              Đang làm
            </Badge>
          ) : (
            <Badge key="status" tone="neutral">
              Ngưng làm
            </Badge>
          ),
          <RowMenu
            key="actions"
            label={`Thao tác với ${member.name}`}
            items={[
              {
                label: "Xem, sửa hồ sơ",
                onSelect: () => setEditingPhone(member.phone),
              },
              {
                label: member.active ? "Ngưng làm" : "Đi làm lại",
                onSelect: () => setActive(member, !member.active),
              },
              {
                label: hasHistory(member) ? "Xóa (đã có lịch sử)" : "Xóa hồ sơ",
                danger: true,
                disabled: hasHistory(member),
                onSelect: () =>
                  setDeleting({
                    name: member.name,
                    onConfirm: () => {
                      updateDemoState({
                        staff: readDemoState().staff.filter(
                          (other) => other.phone !== member.phone
                        ),
                      });
                      showToast(`Đã xóa hồ sơ ${member.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="hồ sơ nhân sự"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingPhone !== null}
        onOpenChange={(open) => {
          if (!open) setEditingPhone(null);
        }}
        title={editing ? `Hồ sơ: ${editing.name}` : "Thêm nhân viên"}
        description={
          editing
            ? `${editing.position} · ${editing.type}${editing.hasAccount ? " · Có tài khoản đăng nhập" : ""}`
            : undefined
        }
        size={DRAWER_SIZE.Large}
        formId={FORM_ID}
        submitLabel={editing ? "Lưu hồ sơ" : "Thêm nhân viên"}
      >
        {editingPhone === null ? null : (
          <StaffForm
            key={editingPhone}
            formId={FORM_ID}
            member={editing}
            onSaved={() => setEditingPhone(null)}
          />
        )}
      </Drawer>
    </>
  );
}
