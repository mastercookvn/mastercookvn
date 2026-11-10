import type {
  AddendumStatus,
  ContractStatus,
  EquipmentIssueStatus,
  InventoryPeriodStatus,
  MealStatus,
  OrderStatus,
  PaymentStatus,
} from "./statuses";

export type BadgeTone = "good" | "wait" | "error" | "info" | "neutral";
type StatusMeta = { label: string; tone: BadgeTone };

export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  PENDING: { label: "Chờ xác nhận", tone: "wait" },
  ACCEPTED: { label: "Đã nhận", tone: "info" },
  REJECTED: { label: "Bị từ chối", tone: "error" },
  EXPIRED: { label: "Hết hạn", tone: "error" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
};

export const CONTRACT_STATUS_META: Record<ContractStatus, StatusMeta> = {
  AWAITING_CONFIRMATION_AND_DEPOSIT: {
    label: "Chờ xác nhận và cọc",
    tone: "wait",
  },
  ACTIVE: { label: "Có hiệu lực", tone: "good" },
  EXPIRED: { label: "Hết hạn", tone: "error" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
  COMPLETED: { label: "Hoàn tất", tone: "neutral" },
};

export const MEAL_STATUS_META: Record<MealStatus, StatusMeta> = {
  PLANNED: { label: "Dự kiến", tone: "neutral" },
  CONFIRMED: { label: "Đã xác nhận", tone: "good" },
  PREPARING: { label: "Đang chuẩn bị", tone: "info" },
  SERVING: { label: "Đang phục vụ", tone: "info" },
  AWAITING_COUNT: { label: "Chờ kiểm đếm", tone: "wait" },
  AWAITING_SETTLEMENT: { label: "Chờ quyết toán", tone: "wait" },
  COMPLETED: { label: "Hoàn tất", tone: "neutral" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
};

export const ADDENDUM_STATUS_META: Record<AddendumStatus, StatusMeta> = {
  PENDING: { label: "Chờ xác nhận", tone: "wait" },
  AWAITING_EXTRA_DEPOSIT: { label: "Chờ cọc bổ sung", tone: "wait" },
  APPLIED: { label: "Đã áp dụng", tone: "good" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
};

export const PAYMENT_STATUS_META: Record<PaymentStatus, StatusMeta> = {
  PENDING: { label: "Chờ", tone: "wait" },
  SUCCEEDED: { label: "Thành công", tone: "good" },
  FAILED: { label: "Thất bại", tone: "error" },
};

export const EQUIPMENT_ISSUE_STATUS_META: Record<
  EquipmentIssueStatus,
  StatusMeta
> = {
  DRAFT: { label: "Nháp", tone: "neutral" },
  ISSUED: { label: "Đã xuất", tone: "info" },
  COUNTED: { label: "Đã kiểm đếm", tone: "good" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
};

export const INVENTORY_PERIOD_STATUS_META: Record<
  InventoryPeriodStatus,
  StatusMeta
> = {
  AWAITING_CLOSE: { label: "Chờ chốt", tone: "wait" },
  CLOSED: { label: "Đã chốt", tone: "good" },
};
