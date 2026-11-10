"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Badge } from "@/components/ui/Badge";
import {
  ConfirmDelete,
  type DeleteTarget,
} from "@/components/ui/ConfirmDelete";
import { RowMenu } from "@/components/ui/RowMenu";
import { useToast } from "@/components/ui/Toast";
import { SERVICES, type Service } from "@/mocks/catalog";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { Drawer } from "@/components/ui/Drawer";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import { ServiceForm } from "./ServiceForm";

const FORM_ID = "service-form";
const NEW_SERVICE_ID = "new";

/** Sample services are already on contracts, so they can only be deactivated. */
const hasHistory = (service: Service) =>
  SERVICES.some((sample) => sample.id === service.id);

export function ServiceTable() {
  const services = useDemoState((state) => state.services);
  const serviceImages = useDemoState((state) => state.serviceImages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = services.find((service) => service.id === editingId) ?? null;
  const [deleting, setDeleting] = useState<DeleteTarget>(null);
  const showToast = useToast();

  const toggleActive = (service: Service) => {
    updateDemoState({
      services: readDemoState().services.map((other) =>
        other.id === service.id
          ? { ...other, active: other.active === false }
          : other
      ),
    });
    showToast(
      service.active === false
        ? `Đã cung cấp lại ${service.name}`
        : `Đã ngưng ${service.name}`
    );
  };

  return (
    <>
      <PanelHeader
        title="Dịch vụ"
        count={services.length}
        subtitle="Đã có lịch sử thì chỉ ngưng, không xóa. Bấm một dòng để sửa hoặc đổi ảnh."
        actions={
          <AddButton onClick={() => setEditingId(NEW_SERVICE_ID)}>
            Thêm dịch vụ
          </AddButton>
        }
      />
      <DataTable
        columns={[
          "Dịch vụ",
          "Mô tả",
          "Đơn vị",
          num("Đơn giá"),
          "Ảnh",
          "Trạng thái",
          "",
        ]}
        rowActions={services.map((service) => ({
          onSelect: () => setEditingId(service.id),
          selected: service.id === editingId,
        }))}
        rows={services.map((service) => [
          service.name,
          <span key="description" className="text-small text-soft">
            {service.description}
          </span>,
          service.unit,
          formatMoney(service.price),
          serviceImages[service.id] || service.image ? (
            <Badge key="image" tone="good">
              Đã có
            </Badge>
          ) : (
            <Badge key="image" tone="wait">
              Chưa có
            </Badge>
          ),
          service.active === false ? (
            <Badge key="status" tone="neutral">
              Ngưng
            </Badge>
          ) : (
            <Badge key="status" tone="good">
              Đang cung cấp
            </Badge>
          ),
          <RowMenu
            key="actions"
            label={`Thao tác với ${service.name}`}
            items={[
              {
                label: "Sửa dịch vụ",
                onSelect: () => setEditingId(service.id),
              },
              {
                label:
                  service.active === false ? "Cung cấp lại" : "Ngưng cung cấp",
                onSelect: () => toggleActive(service),
              },
              {
                label: hasHistory(service)
                  ? "Xóa (đã có lịch sử)"
                  : "Xóa dịch vụ",
                danger: true,
                disabled: hasHistory(service),
                onSelect: () =>
                  setDeleting({
                    name: service.name,
                    onConfirm: () => {
                      updateDemoState({
                        services: readDemoState().services.filter(
                          (other) => other.id !== service.id
                        ),
                      });
                      showToast(`Đã xóa ${service.name}`);
                    },
                  }),
              },
            ]}
          />,
        ])}
      />
      <ConfirmDelete
        target={deleting}
        kind="dịch vụ"
        onClose={() => setDeleting(null)}
      />
      <Drawer
        open={editingId !== null}
        onOpenChange={(open) => {
          if (!open) setEditingId(null);
        }}
        title={editing ? `Sửa dịch vụ: ${editing.name}` : "Thêm dịch vụ"}
        description="Đơn giá mới chỉ áp dụng cho đơn tạo sau khi lưu."
        formId={FORM_ID}
        submitLabel={editing ? "Lưu thay đổi" : "Thêm dịch vụ"}
      >
        <ServiceForm
          key={editingId}
          formId={FORM_ID}
          service={editing}
          onSaved={() => setEditingId(null)}
        />
      </Drawer>
    </>
  );
}
