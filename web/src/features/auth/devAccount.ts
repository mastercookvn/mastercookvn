import { ALL_ROLES } from "@/constants/roles";

/** Development-only staff account until backend auth exists (V11). Holds every role. */
export const DEV_ADMIN_ACCOUNT = {
  name: "Quản trị viên",
  phone: "0900000000",
  roles: ALL_ROLES,
};
