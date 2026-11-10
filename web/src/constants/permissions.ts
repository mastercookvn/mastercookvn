import { ROLE, hasAnyRole, type Role } from "./roles";

const { Consultant: TV, Accountant: KT, Storekeeper: TK, HrManager: NS } = ROLE;

export type WorkspaceTab = { value: string; label: string; roles: Role[] };
export type WorkspaceScreen = {
  title: string;
  /** One line under the page title: what this screen is for. */
  description: string;
  roles: Role[];
  tabs: WorkspaceTab[];
};

/** Only consultants place orders for walk-in or phone customers. */
export const ORDER_ON_BEHALF_ROLES: Role[] = [TV];

/** Section 4.4. An empty list means branch manager only. */
export const WORKSPACE_SCREENS = {
  dashboard: {
    title: "Tổng quan",
    description: "Việc cần xử lý hôm nay và lịch tiệc sắp tới của cơ sở.",
    roles: [TV, KT, TK, NS],
    tabs: [
      { value: "tasks", label: "Việc cần xử lý", roles: [TV, KT, TK, NS] },
      { value: "calendar", label: "Lịch tiệc", roles: [TV, KT, TK, NS] },
    ],
  },
  orders: {
    title: "Đơn đặt tiệc",
    description:
      "Đơn khách đặt online và đơn tư vấn đặt hộ, chờ khảo sát và xác nhận.",
    roles: [TV, KT],
    tabs: [{ value: "list", label: "Danh sách", roles: [TV, KT] }],
  },
  orderDetail: {
    title: "Chi tiết đơn",
    description:
      "Khảo sát từng bữa, kiểm tra tài nguyên rồi nhận hoặc từ chối tiệc.",
    roles: [TV, KT],
    tabs: [
      { value: "meals", label: "Các bữa", roles: [TV, KT] },
      { value: "survey", label: "Khảo sát địa điểm", roles: [TV, KT] },
      { value: "capacity", label: "Khả năng phục vụ", roles: [TV, KT] },
    ],
  },
  contracts: {
    title: "Hợp đồng",
    description: "Hợp đồng đã phát hành, khoản cần thu và khoản phải hoàn.",
    roles: [TV, KT],
    tabs: [
      { value: "list", label: "Danh sách", roles: [TV, KT] },
      { value: "receivables", label: "Cần thu", roles: [KT] },
      { value: "refunds", label: "Cần hoàn", roles: [KT] },
    ],
  },
  contractDetail: {
    title: "Chi tiết hợp đồng",
    description:
      "Phát hành, ký, thu tiền, phụ lục và quyết toán của một hợp đồng.",
    roles: [TV, KT],
    tabs: [
      { value: "overview", label: "Tổng quan, ký", roles: [TV, KT] },
      { value: "payment", label: "Thu tiền", roles: [KT] },
      { value: "addendum", label: "Phụ lục", roles: [TV] },
      { value: "cancel", label: "Hủy bữa", roles: [TV] },
      { value: "settlement", label: "Quyết toán", roles: [KT] },
    ],
  },
  meals: {
    title: "Vận hành bữa",
    description: "Phân công, xuất dụng cụ và kiểm đếm cho từng bữa tiệc.",
    roles: [TV, TK, NS],
    tabs: [
      { value: "progress", label: "Tiến độ", roles: [TV, TK] },
      { value: "staffing", label: "Phân công", roles: [NS] },
      { value: "issue", label: "Xuất dụng cụ", roles: [TK] },
      { value: "count", label: "Kiểm đếm", roles: [TK] },
    ],
  },
  staff: {
    title: "Nhân sự",
    description:
      "Hồ sơ, CV và trạng thái làm việc của nhân viên bếp, phục vụ, vận chuyển.",
    roles: [NS],
    tabs: [],
  },
  ingredients: {
    title: "Nguyên liệu",
    description:
      "Phiếu nhập, kiểm kê cuối tháng, chốt food cost và đề xuất giá.",
    roles: [TK, KT],
    tabs: [
      { value: "purchases", label: "Phiếu nhập", roles: [TK] },
      { value: "stocktake", label: "Kiểm kê", roles: [TK] },
      { value: "closing", label: "Chốt kỳ", roles: [KT] },
      { value: "pricing", label: "Đề xuất giá", roles: [] },
      { value: "catalog", label: "Danh mục", roles: [] },
    ],
  },
  equipment: {
    title: "Dụng cụ",
    description: "Tồn kho, nhập mua, đồ hư và danh mục dụng cụ.",
    roles: [TK],
    tabs: [
      { value: "stock", label: "Tồn kho", roles: [TK] },
      { value: "purchase", label: "Nhập mua", roles: [TK] },
      { value: "damaged", label: "Đồ hư", roles: [TK] },
      { value: "catalog", label: "Danh mục", roles: [TK] },
    ],
  },
  catalog: {
    title: "Thực đơn và dịch vụ",
    description:
      "Món, định lượng, giá gợi ý, set thực đơn, dịch vụ và loại tiệc.",
    roles: [],
    tabs: [
      { value: "dishes", label: "Món, định lượng", roles: [] },
      { value: "sets", label: "Set thực đơn", roles: [] },
      { value: "services", label: "Dịch vụ", roles: [] },
      { value: "event-types", label: "Loại tiệc", roles: [] },
    ],
  },
  reports: {
    title: "Báo cáo",
    description: "Doanh thu, food cost theo tháng và tình hình dụng cụ.",
    roles: [KT, TK],
    tabs: [
      { value: "revenue", label: "Doanh thu, food cost", roles: [KT] },
      { value: "equipment", label: "Dụng cụ", roles: [TK] },
    ],
  },
  settings: {
    title: "Cài đặt",
    description: "Mật khẩu của bạn, tham số nghiệp vụ và tài khoản nội bộ.",
    roles: [TV, KT, TK, NS],
    tabs: [
      { value: "password", label: "Mật khẩu của tôi", roles: [TV, KT, TK, NS] },
      { value: "parameters", label: "Tham số nghiệp vụ", roles: [] },
      { value: "accounts", label: "Tài khoản, phân quyền", roles: [] },
    ],
  },
} satisfies Record<string, WorkspaceScreen>;

export type WorkspaceScreenKey = keyof typeof WORKSPACE_SCREENS;

export function visibleTabs(
  screen: WorkspaceScreenKey,
  roles: readonly Role[]
) {
  const config: WorkspaceScreen = WORKSPACE_SCREENS[screen];
  return config.tabs.filter((tab) => hasAnyRole(roles, tab.roles));
}

export function canViewScreen(
  screen: WorkspaceScreenKey,
  roles: readonly Role[]
) {
  return hasAnyRole(roles, WORKSPACE_SCREENS[screen].roles);
}
