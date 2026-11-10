import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { MEAL_STATUS, type MealStatus } from "@/constants/statuses";

export type MealStep = {
  title: string;
  description: string;
  /** Tab that holds the work, or null when the step is a status change. */
  tab: string | null;
  actionLabel: string | null;
};

const ADVANCE_LABEL: Partial<Record<MealStatus, string>> = {
  [MEAL_STATUS.Confirmed]: "Bắt đầu chuẩn bị",
  [MEAL_STATUS.Preparing]: "Bắt đầu phục vụ",
  [MEAL_STATUS.Serving]: "Kết thúc phục vụ",
};

export const advanceLabel = (status: MealStatus) =>
  ADVANCE_LABEL[status] ?? null;

/** One clear next action per stage, matched to what the viewer is allowed to do. */
export function nextStepFor(
  status: MealStatus,
  roles: readonly Role[],
  equipmentIssued: boolean
): MealStep {
  const canProgress = hasAnyRole(roles, [ROLE.Consultant, ROLE.Storekeeper]);
  const isStorekeeper = hasAnyRole(roles, [ROLE.Storekeeper]);
  const isHr = hasAnyRole(roles, [ROLE.HrManager]);
  const advance = (title: string, description: string): MealStep =>
    canProgress
      ? {
          title,
          description,
          tab: "progress",
          actionLabel: advanceLabel(status),
        }
      : {
          title,
          description: `${description} Tư vấn hoặc thủ kho ghi bước này.`,
          tab: null,
          actionLabel: null,
        };

  switch (status) {
    case MEAL_STATUS.Confirmed:
      if (isHr && !canProgress) {
        return {
          title: "Phân công nhân sự",
          description: "Xếp đủ phục vụ, bếp và vận chuyển trước ngày tiệc.",
          tab: "staffing",
          actionLabel: "Mở phân công",
        };
      }
      return advance("Bắt đầu chuẩn bị", "Khi bếp bắt đầu sơ chế cho bữa này.");
    case MEAL_STATUS.Preparing:
      if (!equipmentIssued && isStorekeeper) {
        return {
          title: "Xuất dụng cụ",
          description: "Kiểm số lượng theo công thức rồi xác nhận phiếu xuất.",
          tab: "issue",
          actionLabel: "Mở phiếu xuất",
        };
      }
      return advance(
        "Bắt đầu phục vụ",
        equipmentIssued
          ? "Dụng cụ đã xuất. Ghi khi đội phục vụ bắt đầu tại địa điểm."
          : "Dụng cụ chưa xuất, thủ kho cần xác nhận phiếu xuất trước."
      );
    case MEAL_STATUS.Serving:
      return advance("Kết thúc phục vụ", "Ghi khi khách dùng tiệc xong.");
    case MEAL_STATUS.AwaitingCount:
      return isStorekeeper
        ? {
            title: "Kiểm đếm dụng cụ",
            description:
              "Nhập số tốt, hư, mất và phần khách chịu cho từng loại.",
            tab: "count",
            actionLabel: "Mở biên bản kiểm đếm",
          }
        : {
            title: "Chờ thủ kho kiểm đếm",
            description: "Thủ kho kiểm đếm dụng cụ thu hồi.",
            tab: null,
            actionLabel: null,
          };
    case MEAL_STATUS.AwaitingSettlement:
      return {
        title: "Chờ kế toán quyết toán",
        description: "Kế toán phát hành hóa đơn, khách thanh toán số dư.",
        tab: null,
        actionLabel: null,
      };
    default:
      return {
        title: "Không còn việc",
        description: "Bữa đã kết thúc.",
        tab: null,
        actionLabel: null,
      };
  }
}
