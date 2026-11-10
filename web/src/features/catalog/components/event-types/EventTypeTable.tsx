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
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { EVENT_TYPES } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

const FORM_ID = "event-type-form";

/** Sample types are on past orders and reports, so they stay. */
const hasHistory = (eventType: string) => EVENT_TYPES.includes(eventType);

export function EventTypeTable() {
  const showToast = useToast();
  const eventTypes = useDemoState((state) => state.eventTypes);
  const [open, setOpen] = useState(false);
  const [original, setOriginal] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);

  const nameError = !name.trim()
    ? "Nhập tên loại tiệc"
    : eventTypes.some(
          (other) =>
            other !== original &&
            other.toLowerCase() === name.trim().toLowerCase()
        )
      ? "Đã có loại tiệc này"
      : null;

  const openForm = (eventType: string | null) => {
    setOriginal(eventType);
    setName(eventType ?? "");
    setSubmitted(false);
    setOpen(true);
  };

  return (
    <>
      <PanelHeader
        title="Loại tiệc"
        count={eventTypes.length}
        subtitle="Dùng để lọc đơn và báo cáo doanh thu"
        actions={
          <AddButton onClick={() => openForm(null)}>Thêm loại tiệc</AddButton>
        }
      />
      <DataTable
        columns={["Loại tiệc", "Trạng thái", ""]}
        rows={eventTypes.map((eventType) => [
          eventType,
          <Badge key="status" tone="good">
            Đang sử dụng
          </Badge>,
          <RowMenu
            key="actions"
            label={`Thao tác với ${eventType}`}
            items={[
              { label: "Đổi tên", onSelect: () => openForm(eventType) },
              {
                label: hasHistory(eventType)
                  ? "Xóa (đã có lịch sử)"
                  : "Xóa loại tiệc",
                danger: true,
                disabled: hasHistory(eventType),
                onSelect: () =>
                  setDeleting({
                    name: eventType,
                    onConfirm: () => {
                      updateDemoState({
                        eventTypes: readDemoState().eventTypes.filter(
                          (other) => other !== eventType
                        ),
                      });
                      showToast(`Đã xóa loại tiệc ${eventType}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="loại tiệc"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title={original ? `Đổi tên: ${original}` : "Thêm loại tiệc"}
        description="Loại tiệc có ngay trong bộ lọc đơn và báo cáo."
        formId={FORM_ID}
        submitLabel={original ? "Lưu tên mới" : "Thêm loại tiệc"}
      >
        <form
          id={FORM_ID}
          className="l-stack"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            if (nameError) return;
            const current = readDemoState().eventTypes;
            updateDemoState({
              eventTypes: original
                ? current.map((other) =>
                    other === original ? name.trim() : other
                  )
                : [name.trim(), ...current],
            });
            showToast(
              original
                ? `Đã đổi ${original} thành ${name.trim()}`
                : `Đã thêm loại tiệc ${name.trim()}`
            );
            setOpen(false);
          }}
        >
          <TextField
            id="event-type-name"
            label="Tên loại tiệc"
            placeholder="Thôi nôi"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={submitted ? nameError : null}
          />
        </form>
      </Drawer>
    </>
  );
}
