import { ROLE, type Role } from "@/constants/roles";

export type StaffAccount = {
  name: string;
  phone: string;
  roles: Role[];
  active: boolean;
};

export const STAFF_ACCOUNTS: StaffAccount[] = [
  {
    name: "Phạm Thu Hà",
    phone: "0901 000 001",
    roles: [ROLE.BranchManager],
    active: true,
  },
  {
    name: "Trịnh Bảo Ngọc",
    phone: "0901 000 002",
    roles: [ROLE.Consultant],
    active: true,
  },
  {
    name: "Ngô Đức Anh",
    phone: "0901 000 003",
    roles: [ROLE.Accountant],
    active: true,
  },
  {
    name: "Hoàng Anh Khoa",
    phone: "0912 000 666",
    roles: [ROLE.Storekeeper],
    active: true,
  },
  {
    name: "Dương Mỹ Linh",
    phone: "0901 000 005",
    roles: [ROLE.HrManager, ROLE.Consultant],
    active: true,
  },
  {
    name: "Tạ Công Minh",
    phone: "0901 000 006",
    roles: [ROLE.Accountant],
    active: false,
  },
];

export type StaffMember = {
  name: string;
  phone: string;
  type: "Cố định" | "Thời vụ";
  position: string;
  active: boolean;
  hasAccount: boolean;
};

export const STAFF: StaffMember[] = [
  {
    name: "Nguyễn Văn Hùng",
    phone: "0912 000 111",
    type: "Cố định",
    position: "Bếp",
    active: true,
    hasAccount: false,
  },
  {
    name: "Lê Thị Hoa",
    phone: "0912 000 222",
    type: "Cố định",
    position: "Bếp",
    active: true,
    hasAccount: false,
  },
  {
    name: "Phạm Quốc Bảo",
    phone: "0912 000 333",
    type: "Cố định",
    position: "Vận chuyển",
    active: true,
    hasAccount: false,
  },
  {
    name: "Đỗ Minh Tâm",
    phone: "0912 000 444",
    type: "Thời vụ",
    position: "Phục vụ",
    active: true,
    hasAccount: false,
  },
  {
    name: "Vũ Thu Trang",
    phone: "0912 000 555",
    type: "Thời vụ",
    position: "Phục vụ",
    active: true,
    hasAccount: false,
  },
  {
    name: "Hoàng Anh Khoa",
    phone: "0912 000 666",
    type: "Cố định",
    position: "Kiểm đếm",
    active: true,
    hasAccount: true,
  },
  {
    name: "Bùi Ngọc Lan",
    phone: "0912 000 777",
    type: "Thời vụ",
    position: "Phục vụ",
    active: false,
    hasAccount: false,
  },
];

export const activeStaffOptions = () =>
  STAFF.filter((member) => member.active).map(
    (member) => `${member.name} · ${member.position}`,
  );

export const SAMPLE_ACCOUNTS = [
  { label: "Quản lý cơ sở", phone: "0901 000 001" },
  { label: "Tư vấn", phone: "0901 000 002" },
  { label: "Kế toán", phone: "0901 000 003" },
  { label: "Thủ kho", phone: "0912 000 666" },
  { label: "Nhân sự, Tư vấn", phone: "0901 000 005" },
  { label: "Khách hàng", phone: "0903 123 456" },
];
