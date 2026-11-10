export const ROLE = {
  Consultant: "CONSULTANT",
  Accountant: "ACCOUNTANT",
  Storekeeper: "STOREKEEPER",
  HrManager: "HR_MANAGER",
  BranchManager: "BRANCH_MANAGER",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export const ROLE_LABEL: Record<Role, string> = {
  CONSULTANT: "Tư vấn",
  ACCOUNTANT: "Kế toán",
  STOREKEEPER: "Thủ kho",
  HR_MANAGER: "Quản lý nhân sự",
  BRANCH_MANAGER: "Quản lý cơ sở",
};

export const ROLE_SHORT_LABEL: Record<Role, string> = {
  CONSULTANT: "Tư vấn",
  ACCOUNTANT: "Kế toán",
  STOREKEEPER: "Thủ kho",
  HR_MANAGER: "Nhân sự",
  BRANCH_MANAGER: "Quản lý",
};

export const ALL_ROLES = Object.values(ROLE);

/** Roles combine; the branch manager has every permission. */
export function hasAnyRole(roles: readonly Role[], allowed: readonly Role[]) {
  return (
    roles.includes(ROLE.BranchManager) ||
    allowed.some((role) => roles.includes(role))
  );
}
