"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LIVE_VALIDATION_MODE, requiredTextSchema } from "@/lib/validation";
import { readDemoState, updateDemoState, useDemoState } from "@/lib/demoStore";

const FORM_ID = "event-type-form";

export function EventTypeTable() {
  const showToast = useToast();
  const eventTypes = useDemoState((state) => state.eventTypes);
  const submittedOrders = useDemoState((state) => state.submittedOrders);
  /** Types on past orders and reports stay. */
  const hasHistory = (eventType: string) =>
    submittedOrders.some((order) => order.eventType === eventType);
  const [open, setOpen] = useState(false);
  const [original, setOriginal] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: requiredTextSchema("tên loại tiệc").refine(
          (name) =>
            !eventTypes.some(
              (other) =>
                other !== original && other.toLowerCase() === name.toLowerCase()
            ),
          "Đã có loại tiệc này"
        ),
      })
    ),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { name: "" },
  });

  const openForm = (eventType: string | null) => {
    setOriginal(eventType);
    reset({ name: eventType ?? "" });
    setOpen(true);
  };

  return (
    <>
      <PanelHeader
        title="Loại tiệc"
        count={eventTypes.length}
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
        formId={FORM_ID}
        submitLabel={original ? "Lưu tên mới" : "Thêm loại tiệc"}
      >
        <form
          id={FORM_ID}
          className="l-stack"
          noValidate
          onSubmit={handleSubmit(({ name }) => {
            const current = readDemoState().eventTypes;
            updateDemoState({
              eventTypes: original
                ? current.map((other) => (other === original ? name : other))
                : [name, ...current],
            });
            showToast(
              original
                ? `Đã đổi ${original} thành ${name}`
                : `Đã thêm loại tiệc ${name}`
            );
            setOpen(false);
          })}
        >
          <TextField
            id="event-type-name"
            label="Tên loại tiệc"
            placeholder="Thôi nôi"
            {...register("name")}
            error={errors.name?.message}
          />
        </form>
      </Drawer>
    </>
  );
}
